/*
 * Copyright © 2025 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sdk

data class SDKConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val caseClassName: String,
    val startingFields: Map<String, Any>,
)
