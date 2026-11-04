package com.pega.constellation.sdk.kmp.test.mock.handlers.pega25

import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxCasesHandler

internal class DxCases25Handler : VersionedDxCasesHandler(PegaVersion.v25_1) {
    override val caseTypes = mapOf(
        "OFV0MW-Marco-Work-AutoCompleteTest" to "AutoCompleteTest-POST.json",
        "O40M3A-MarekCo-Work-DataReferenceListOfRecordsTest" to "DataReferenceListOfRecordsTest-POST.json",
        "O40M3A-MarekCo-Work-DataReferenceMultiSelectTest" to "DataReferenceMultiSelectTest-POST.json",
        "OI1OYV-Marco2-Work-DetailsTemplateTest" to "DetailsTest-POST.json",
        "OFV0MW-Marco-Work-EmbeddedDataTest-SingleRecord" to "EmbeddedDataTest-SingleRecord.json",
        "OFV0MW-Marco-Work-EmbeddedDataTest-Combobox" to "EmbeddedDataTest-Combobox-POST.json",
        "OI1OYV-Marco2-Work-DataReferenceTest-FieldOnly" to "DataRefSemanticLinkTest-POST.json",
        "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards" to "DataReferenceMultiSelectCardsTest-POST.json",
        "OI1OYV-Marco2-Work-DataReferenceSingleRecordCards" to "DataReferenceSingleSelectCardsTest-POST.json",
        "OI1OYV-Marco2-Work-SimpleTest" to "NextPreviousTest-Step1-POST.json",
        "OI1OYV-Marco2-Work-Invisible-Required" to "HiddenRequiredTextInputTest-POST.json"
    )
}
