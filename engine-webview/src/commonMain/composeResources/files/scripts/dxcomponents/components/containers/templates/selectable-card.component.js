import { handleEvent } from "../../../helpers/event-util.js";
import { deleteInstruction, insertInstruction, updateNewInstructions } from "../../../helpers/instructions-utils.js";
import { ContainerBaseComponent } from "../container-base.component.js";

export class SelectableCardComponent extends ContainerBaseComponent {
    selectionKey = "";
    selectedValues = [];
    selectionList = "";
    primaryField = "";
    cardType;
    cards;
    value;
    props = {
        children: [],
        value: "",
        disabled: false,
        readOnly: false,
        displayMode: "",
        cardType: "",
        hideFieldLabels: false,
        cards: []
    };

    constructor(componentsManager, pConn, cardType) {
        super(componentsManager, pConn);
        this.type = "SelectableCard";
        this.cardType = cardType;
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.checkAndUpdate();
    }

    update(pConn, cardType) {
        const pConnChanged = this.updatePConnAndResubscribeIfContextChanged(pConn, this.checkAndUpdate);
        if (this.cardType !== cardType || pConnChanged) {
            this.cardType = cardType;
            this.checkAndUpdate();
        }
    }

    destroy() {
        this.cards = [];
        super.destroy();
    }

    fieldOnChange(value) {
        this.props.value = value;
        handleEvent(this.pConn.getActionsApi(), "changeNblur", this.propName, value);
    }

    onEvent(event) {
        super.onEvent(event);
        if (event.type === "ClickItem") {
            const clickedItemIndex = Number(event.componentData.clickedItemIndex);
            const element = this.cards[clickedItemIndex].commonCardProps;
            if (this.cardType === "radio") {
                this.fieldOnChange(element.key);
            } else if (this.cardType === "checkbox") {
                element.selected = event.componentData.isSelected === "true";
                this.#handleChangeMultiMode(element);
            }
        }
    }

    updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.value = configProps.value ?? this.props.value;
        this.props.value = this.value;
        this.propName = this.pConn.getStateProps().value;
        this.props.cardType = this.cardType;

        const disabled = this.utils.getBooleanValue(configProps.disabled ?? this.props.disabled);
        this.props.disabled = disabled;
        this.props.displayMode = configProps.displayMode ?? this.props.displayMode;
        const readOnly =
            configProps.renderMode === "ReadOnly" ||
            this.props.displayMode === "DISPLAY_ONLY" ||
            configProps.readOnly;
        this.props.readOnly = readOnly;

        let image;
        let recordKey = "";
        let cardLabel = "";
        const imageSize = configProps.imageSize ?? "";
        const showImageDescription = configProps.showImageDescription ?? false;
        const imagePosition = configProps.imagePosition;

        if (this.cardType === "radio") {
            ({ recordKey, cardLabel, image } = this.#configureRadioCard(imagePosition, imageSize, showImageDescription));
        }

        if (this.cardType === "checkbox") {
            ({ recordKey, cardLabel, image }
                = this.#configureCheckboxCard(configProps, readOnly, imagePosition, imageSize, showImageDescription));
        }

        const hideFieldLabels = configProps.hideFieldLabels;
        const commonProps = {
            hideFieldLabels,
            datasource: configProps.datasource,
            additionalProps: configProps.additionalProps,
            image,
            recordKey,
            cardLabel
        };
        const imageDescriptionKey = this.#getImageDescription(commonProps);
        const cardDataSource = this.#getCardDataSource(readOnly, commonProps);
        const oldChildrenById = new Map(this.childrenComponents.map((component) => [component.compId, component]));
        const newChildrenComponents = [];
        const newCards = [];

        cardDataSource.forEach((card, cardIndex) => {
            const resolvedFields = this.utils.resolveReferenceFields(
                card,
                commonProps.hideFieldLabels,
                commonProps.recordKey,
                this.pConn,
                disabled
            );
            const { cardChildrenComponents, cardComponentsIds}
                = this.#buildCard(resolvedFields, cardIndex, oldChildrenById);
            newChildrenComponents.push(...cardChildrenComponents);

            const commonCardProps = {
                key: card[commonProps.recordKey],
                label: card[commonProps.cardLabel],
                selected: this.#isSelected(card, commonProps.recordKey),
            };
            const cardImage = this.#createCardImage(card, commonProps, imageDescriptionKey);
            newCards.push({commonCardProps, cardImage, cardComponentsIds});
        });
        this.childrenComponents
            .filter((component) => !newChildrenComponents.includes(component))
            .forEach((component) => component.destroy());
        this.childrenComponents = newChildrenComponents;
        this.cards = newCards;

        this.props.children = this.getChildrenProps();
        this.props.cards = this.cards.map((card) => {
            return {
                commonProps: card.commonCardProps,
                image: card.cardImage,
                componentIds: card.cardComponentsIds,
            };
        });
        this.props.hideFieldLabels = hideFieldLabels;
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #configureRadioCard(imagePosition, imageSize, showImageDescription) {
        const stateProps = this.pConn.getStateProps();
        const recordKey = stateProps.value?.split(".").pop() ?? "";
        const cardLabel = stateProps.primaryField?.split(".").pop() ?? "";
        const image = {
            imagePosition,
            imageSize,
            showImageDescription,
            imageField: stateProps.image?.split(".").pop(),
            imageDescription: stateProps.imageDescription?.split(".").pop(),
        };
        return { recordKey, cardLabel, image };
    }

    #configureCheckboxCard(configProps, readOnly, imagePosition, imageSize, showImageDescription) {
        this.selectionKey = configProps.selectionKey;
        const recordKey = this.selectionKey?.split(".").pop() ?? "";
        const cardLabel = configProps.primaryField?.split(".").pop() ?? "";

        const image = {
            imagePosition,
            imageSize,
            showImageDescription,
            imageField: configProps.image?.split(".").pop(),
            imageDescription: this.pConn.getRawMetadata()?.config?.imageDescription?.split(".").pop(),
        };

        this.selectionList = configProps.selectionList;
        this.selectedValues = configProps.readonlyContextList;
        this.primaryField = configProps.primaryField;

        if (this.selectionList && !readOnly) {
            this.pConn.setReferenceList(this.selectionList);
            updateNewInstructions(this.pConn, this.selectionList);
        }
        return { recordKey, cardLabel, image };
    }

    #createCardImage(card, commonProps, imageDescriptionKey) {
        return commonProps.image?.imageField
            ? {
                src: card[commonProps.image.imageField],
                alt: commonProps.image.showImageDescription && imageDescriptionKey
                    ? card[imageDescriptionKey]
                    : "",
                position: commonProps.image.imagePosition,
                size: commonProps.image.imageSize
            }
            : undefined;
    }

    #getImageDescription(commonProps) {
        return commonProps.image?.showImageDescription
            ? commonProps.image.imageDescription
            : undefined;
    }

    #getCardDataSource(readOnly, commonProps) {
        return readOnly || this.props.displayMode === "DISPLAY_ONLY"
            ? this.selectedValues || []
            : commonProps.datasource?.source || [];
    }

    #isSelected(card, recordKey) {
        if (this.cardType === "checkbox") {
            return this.selectedValues
                ? this.selectedValues.some?.((data) => data[recordKey] === card[recordKey])
                : false;
        }
        if (this.cardType === "radio") {
            return this.value === card[recordKey];
        }
        return false;
    }

    #buildCard(resolvedFields, cardIndex, oldChildrenById) {
        const cardChildrenComponents = [];
        const cardComponentsIds = [];
        resolvedFields.forEach((field, fieldIndex) => {
            const oldComponentId = this.cards?.[cardIndex]?.cardComponentsIds?.[fieldIndex];
            const oldComponent = oldComponentId != null ? oldChildrenById.get(oldComponentId) : undefined;
            const newComponent = this.reuseOrCreateChild(oldComponent, field.value.getPConnect());
            cardChildrenComponents.push(newComponent);
            cardComponentsIds.push(newComponent.compId);
        });
        return {
            cardChildrenComponents: cardChildrenComponents,
            cardComponentsIds: cardComponentsIds
        };
    }

    #handleChangeMultiMode(element) {
        if (element.selected) {
            insertInstruction(this.pConn, this.selectionList, this.selectionKey, this.primaryField, {
                id: element.key,
                primary: element.label,
            });
        } else {
            deleteInstruction(this.pConn, this.selectionList, this.selectionKey, {
                id: element.key,
                primary: element.label,
            });
        }
        this.pConn.clearErrorMessages({property: this.selectionList, category: "", context: ""});
    }
}
