//
// Copyright (c) 2018 and Confidential to Pegasystems Inc. All rights reserved.
//

#import "WKWebView+PMS.h"
#import <ConstellationSDK-Swift.h>

@import ObjectiveC.runtime;
@class WebViewOverride;

@interface WebViewOverride (URLSchemeHandler)

+ (BOOL)isRegisteringURLSchemeHandler;

@end

@implementation WKWebView (PMS)

+ (void)load {
    static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            Method originalMethod = class_getClassMethod(self.class, @selector(handlesURLScheme:));
            Method swizzledMethod = class_getClassMethod(self.class, @selector(pms_handlesURLScheme:));
            method_exchangeImplementations(originalMethod, swizzledMethod);
        });
}

+ (BOOL)pms_handlesURLScheme:(NSString *)urlScheme {
    if (![WebViewOverride isRegisteringURLSchemeHandler]) {
        return [self pms_handlesURLScheme:urlScheme];
    }
    if (![urlScheme hasPrefix:@"http"] && ![urlScheme hasPrefix:@"https"]) {
        return [self pms_handlesURLScheme:urlScheme];
    }
    return NO;
}

@end
