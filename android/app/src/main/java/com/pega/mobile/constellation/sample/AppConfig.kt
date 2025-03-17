/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample

object AppConfig {
    object Pega {
        const val URL = "https://lab-05423-bos.lab.pega.com/prweb"
          const val CASE_CLASS_NAME = "DIXL-MediaCo-Work-SDKTesting"
//        const val CASE_CLASS_NAME = "DIXL-MediaCo-Work-NewService"

        object Auth {
            const val CLIENT_ID = "77513330016901238555"
            const val REDIRECT_URI = "com.pega.mobile.constellation.sample://redirect"
        }
    }
}
