package com.pega.mobile.constellation.sdk.components

import org.json.JSONObject

interface Component {
    fun updateProps(propsJson: JSONObject)
}
