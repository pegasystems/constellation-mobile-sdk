package com.pega.constellation.sdk.kmp.test.mock.handlers.pega26

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxDataViewsHandler
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal class DxDataViews26Handler : VersionedDxDataViewsHandler(PegaVersion.v26_1) {
    override fun carsByMake(make: String): MockResponse? =
        if (make == "Mazda") asset("data_views/D_CarsByMake-Mazda.json") else null

    override fun singleRecordCars(request: MockRequest): MockResponse {
        if (request.method != "POST") return Error(400, "Expected POST for D_CarList")
        val body = request.body ?: return Error(400, "Missing D_CarList request body")
        val fields = Json.parseToJsonElement(body).jsonObject["query"]
            ?.jsonObject?.get("select")?.jsonArray
            ?.map { it.jsonObject["field"]?.jsonPrimitive?.content }
        val projection = when (fields) {
            null -> "DataReferenceListOfRecords-All"
            listOf("Model", "pyGUID") -> "Models"
            listOf("Brand", "Model", "Price", "pyGUID") -> "TableConfig"
            listOf(
                "Brand", "Model", "Mileage", "Length", "DateOfProduction", "Damaged", "Price",
                "Discount", "CarAvailability", "DealerEmail", "DealerPhone", "DealerWebsite",
                "DealerWorkDayStart", "pyGUID"
            ) -> "DataReference-Details"
            else -> return Error(400, "Unexpected D_CarList field projection")
        }
        val fixture = when (projection) {
            "Models" -> "D_CarList-SingleRecord-Models.json"
            else -> "D_CarList-$projection.json"
        }
        return asset("data_views/$fixture")
    }
}
