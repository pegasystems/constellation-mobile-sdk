package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableCardImagePosition.ABOVE_TEXT
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableCardImagePosition.AFTER_TEXT
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableCardImagePosition.BEFORE_TEXT
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.TEXT_ALPHA
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.getTextColor
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.selectable_card_image_placeholder
import io.kamel.image.KamelImage
import io.kamel.image.KamelImageBox
import io.kamel.image.asyncPainterResource
import org.jetbrains.compose.resources.painterResource

data class SelectableCardItem(
    val key: String,
    val label: String,
    val selected: Boolean,
    val fields: List<SelectableCardField> = emptyList(),
    val image: SelectableCardImage? = null
)

data class SelectableCardField(
    val name: String,
    val value: String
)

enum class SelectableCardImagePosition {
    BEFORE_TEXT, ABOVE_TEXT, AFTER_TEXT
}

enum class SelectableCardImageSize {
    SMALL, LARGE, FLEXIBLE
}

data class SelectableCardImage(
    val src: String,
    val alt: String,
    val position: SelectableCardImagePosition,
    val size: SelectableCardImageSize
)

@Composable
fun SelectableCard(
    cards: List<SelectableCardItem>,
    modifier: Modifier = Modifier,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    multiSelect: Boolean = false,
    hideFieldLabels: Boolean = false,
    onCardClick: (Int, Boolean) -> Unit = { _, _ -> }
) {
    Column(modifier = modifier.fillMaxWidth().padding(top = 8.dp, bottom = 8.dp)) {
        cards.forEachIndexed { index, card ->
            SelectableCardItem(
                card = card,
                multiSelect = multiSelect,
                disabled = disabled,
                readOnly = readOnly,
                hideFieldLabels = hideFieldLabels,
                onClick = { onCardClick(index, !card.selected) }
            )
        }
    }
}

@Composable
private fun SelectableCardItem(
    card: SelectableCardItem,
    multiSelect: Boolean,
    disabled: Boolean,
    readOnly: Boolean,
    hideFieldLabels: Boolean,
    onClick: () -> Unit
) {
    val borderColor = when {
        readOnly -> MaterialTheme.colorScheme.outline
        card.selected && !disabled -> MaterialTheme.colorScheme.primary
        card.selected && disabled -> MaterialTheme.colorScheme.primary.copy(alpha = TEXT_ALPHA)
        !card.selected && !disabled -> MaterialTheme.colorScheme.outline
        else -> MaterialTheme.colorScheme.onSurface.copy(alpha = TEXT_ALPHA)
    }
    val borderWidth = if (card.selected && !readOnly) 2.dp else 1.dp
    val componentEnabled = !disabled && !readOnly
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(enabled = componentEnabled, onClick = onClick)
            .semantics {
                role = if (multiSelect) Role.Checkbox else Role.RadioButton
                selected = card.selected
            },
        border = BorderStroke(borderWidth, borderColor),
        colors = CardDefaults.cardColors(
            containerColor = if (card.selected) {
                MaterialTheme.colorScheme.primaryContainer
            } else {
                MaterialTheme.colorScheme.surface
            }
        )
    ) {
        CardContent(card.image, Modifier.padding(16.dp)) { modifier ->
            Row(
                modifier = modifier.padding(16.dp),
                verticalAlignment = Alignment.Top
            ) {
                SelectableCardTextContent(
                    card = card,
                    hideFieldLabels = hideFieldLabels,
                    disabled = disabled,
                    modifier = if (card.image?.position == BEFORE_TEXT) {
                        Modifier
                    } else {
                        Modifier.weight(1f)
                    }.padding(top = 16.dp)
                )
            }
        }
    }
}

@Composable
private fun SelectableCardTextContent(
    card: SelectableCardItem,
    hideFieldLabels: Boolean,
    disabled: Boolean,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        val textColor = getTextColor(disabled)
        Text(
            card.label,
            color = textColor,
            style = MaterialTheme.typography.titleLarge
        )
        card.fields.forEach { field ->
            if (hideFieldLabels || field.name.isEmpty()) {
                Text(field.value, color = textColor)
            } else {
                Text("${field.name}: ${field.value}", color = textColor)
            }
        }
    }
}

@Composable
private fun CardContent(
    image: SelectableCardImage?,
    modifier: Modifier,
    content: @Composable (Modifier) -> Unit
) =
    image?.let {
        when (it.position) {
            BEFORE_TEXT -> ContentWithImageBeforeText(it, modifier, content)
            ABOVE_TEXT -> ContentWithImageAboveText(it, modifier, content)
            AFTER_TEXT -> ContentWithImageAfterText(it, modifier, content)
        }
    } ?: content(Modifier)


@Composable
private fun ContentWithImageBeforeText(
    image: SelectableCardImage,
    modifier: Modifier,
    content: @Composable (Modifier) -> Unit
) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = modifier) {
        SelectableCardImageView(image)
        Spacer(Modifier.width(8.dp))
        content(Modifier.weight(1f))
    }
}

@Composable
private fun ContentWithImageAboveText(
    image: SelectableCardImage,
    modifier: Modifier,
    content: @Composable (Modifier) -> Unit
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        FullWidthSelectableCardImageView(image)
        Spacer(Modifier.height(8.dp))
        content(Modifier.fillMaxWidth())
    }
}

@Composable
private fun ContentWithImageAfterText(
    image: SelectableCardImage,
    modifier: Modifier,
    content: @Composable (Modifier) -> Unit
) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = modifier) {
        content(Modifier.weight(1f))
        Spacer(Modifier.width(8.dp))
        SelectableCardImageView(image)
    }
}

@Composable
private fun SelectableCardImageView(image: SelectableCardImage, modifier: Modifier = Modifier) {
    val imageModifier = when (image.size) {
        SelectableCardImageSize.SMALL -> Modifier.width(96.dp).height(96.dp)
        SelectableCardImageSize.LARGE -> Modifier.width(192.dp).height(192.dp)
        SelectableCardImageSize.FLEXIBLE -> Modifier.width(144.dp)
            .height(144.dp) // just fallback to medium size for 'flexible'
    }
    val imageShape = MaterialTheme.shapes.medium
    Box(
        modifier = imageModifier
            .testTag("selectable_card_image_${image.alt}")
            .then(modifier)
            .background(MaterialTheme.colorScheme.surfaceVariant, imageShape)
    ) {
        KamelImage(
            resource = { asyncPainterResource(image.src) },
            contentDescription = image.alt,
            modifier = Modifier.fillMaxSize().clip(imageShape),
            contentScale = ContentScale.Crop,
            onFailure = {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Icon(
                        painter = painterResource(Res.drawable.selectable_card_image_placeholder),
                        contentDescription = image.alt,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(16.dp)
                    )
                }
            }
        )
    }
}

@Composable
private fun FullWidthSelectableCardImageView(
    image: SelectableCardImage,
    modifier: Modifier = Modifier
) {
    val imageShape = MaterialTheme.shapes.medium
    KamelImageBox(
        resource = { asyncPainterResource(image.src) },
        modifier = Modifier
            .fillMaxWidth()
            .testTag("selectable_card_image_${image.alt}")
            .then(modifier)
            .background(MaterialTheme.colorScheme.surfaceVariant, imageShape)
            .clip(imageShape),
        onFailure = {
            Box(
                modifier = Modifier.fillMaxWidth().height(144.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    painter = painterResource(Res.drawable.selectable_card_image_placeholder),
                    contentDescription = image.alt,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(16.dp)
                )
            }
        },
        onSuccess = { painter ->
            val intrinsicSize = painter.intrinsicSize
            val aspectRatio = if (
                intrinsicSize.width.isFinite() && intrinsicSize.height.isFinite() &&
                intrinsicSize.width > 0f && intrinsicSize.height > 0f
            ) {
                intrinsicSize.width / intrinsicSize.height
            } else {
                1f
            }
            Image(
                painter = painter,
                contentDescription = image.alt,
                modifier = Modifier.fillMaxWidth().aspectRatio(aspectRatio).clip(imageShape),
                contentScale = ContentScale.FillWidth
            )
        }
    )
}
