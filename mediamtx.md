---
title: mediamtx
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# mediamtx

Base URLs:

# Authentication

# Authentication

<a id="opIdauthJwksRefresh"></a>

## POST Manually refreshes the JWT JWKS.

POST /v3/auth/jwks/refresh

> 返回示例

> 500 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# Configuration

<a id="opIdconfigGlobalGet"></a>

## GET returns the global configuration.

GET /v3/config/global/get

> 返回示例

> 200 Response

```json
{
  "logLevel": "string",
  "logDestinations": [
    "string"
  ],
  "logFile": "string",
  "sysLogPrefix": "string",
  "readTimeout": "string",
  "writeTimeout": "string",
  "writeQueueSize": 0,
  "udpMaxPayloadSize": 0,
  "runOnConnect": "string",
  "runOnConnectRestart": true,
  "runOnDisconnect": "string",
  "authMethod": "string",
  "authInternalUsers": [
    {
      "user": "string",
      "pass": "string",
      "ips": [
        "string"
      ],
      "permissions": [
        {
          "action": "string",
          "path": "string"
        }
      ]
    }
  ],
  "authHTTPAddress": "string",
  "authHTTPExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTJWKS": "string",
  "authJWTJWKSFingerprint": "string",
  "authJWTClaimKey": "string",
  "authJWTExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTInHTTPQuery": true,
  "api": true,
  "apiAddress": "string",
  "apiEncryption": true,
  "apiServerKey": "string",
  "apiServerCert": "string",
  "apiAllowOrigin": "string",
  "apiTrustedProxies": [
    "string"
  ],
  "metrics": true,
  "metricsAddress": "string",
  "metricsEncryption": true,
  "metricsServerKey": "string",
  "metricsServerCert": "string",
  "metricsAllowOrigin": "string",
  "metricsTrustedProxies": [
    "string"
  ],
  "pprof": true,
  "pprofAddress": "string",
  "pprofEncryption": true,
  "pprofServerKey": "string",
  "pprofServerCert": "string",
  "pprofAllowOrigin": "string",
  "pprofTrustedProxies": [
    "string"
  ],
  "playback": true,
  "playbackAddress": "string",
  "playbackEncryption": true,
  "playbackServerKey": "string",
  "playbackServerCert": "string",
  "playbackAllowOrigin": "string",
  "playbackTrustedProxies": [
    "string"
  ],
  "rtsp": true,
  "rtspTransports": [
    "string"
  ],
  "rtspEncryption": "string",
  "rtspAddress": "string",
  "rtspsAddress": "string",
  "rtpAddress": "string",
  "rtcpAddress": "string",
  "multicastIPRange": "string",
  "multicastRTPPort": 0,
  "multicastRTCPPort": 0,
  "rtspServerKey": "string",
  "rtspServerCert": "string",
  "rtspAuthMethods": [
    "string"
  ],
  "rtmp": true,
  "rtmpAddress": "string",
  "rtmpEncryption": "string",
  "rtmpsAddress": "string",
  "rtmpServerKey": "string",
  "rtmpServerCert": "string",
  "hls": true,
  "hlsAddress": "string",
  "hlsEncryption": true,
  "hlsServerKey": "string",
  "hlsServerCert": "string",
  "hlsAllowOrigin": "string",
  "hlsTrustedProxies": [
    "string"
  ],
  "hlsAlwaysRemux": true,
  "hlsVariant": "string",
  "hlsSegmentCount": 0,
  "hlsSegmentDuration": "string",
  "hlsPartDuration": "string",
  "hlsSegmentMaxSize": "string",
  "hlsDirectory": "string",
  "hlsMuxerCloseAfter": "string",
  "webrtc": true,
  "webrtcAddress": "string",
  "webrtcEncryption": true,
  "webrtcServerKey": "string",
  "webrtcServerCert": "string",
  "webrtcAllowOrigin": "string",
  "webrtcTrustedProxies": [
    "string"
  ],
  "webrtcLocalUDPAddress": "string",
  "webrtcLocalTCPAddress": "string",
  "webrtcIPsFromInterfaces": true,
  "webrtcIPsFromInterfacesList": [
    "string"
  ],
  "webrtcAdditionalHosts": [
    "string"
  ],
  "webrtcICEServers2": [
    {
      "url": "string",
      "username": "string",
      "password": "string",
      "clientOnly": true
    }
  ],
  "webrtcHandshakeTimeout": "string",
  "webrtcTrackGatherTimeout": "string",
  "webrtcSTUNGatherTimeout": "string",
  "srt": true,
  "srtAddress": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[GlobalConf](#schemaglobalconf)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigGlobalSet"></a>

## PATCH patches the global configuration.

PATCH /v3/config/global/patch

all fields are optional.

> Body 请求参数

```json
{
  "logLevel": "string",
  "logDestinations": [
    "string"
  ],
  "logFile": "string",
  "sysLogPrefix": "string",
  "readTimeout": "string",
  "writeTimeout": "string",
  "writeQueueSize": 0,
  "udpMaxPayloadSize": 0,
  "runOnConnect": "string",
  "runOnConnectRestart": true,
  "runOnDisconnect": "string",
  "authMethod": "string",
  "authInternalUsers": [
    {
      "user": "string",
      "pass": "string",
      "ips": [
        "string"
      ],
      "permissions": [
        {
          "action": "string",
          "path": "string"
        }
      ]
    }
  ],
  "authHTTPAddress": "string",
  "authHTTPExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTJWKS": "string",
  "authJWTJWKSFingerprint": "string",
  "authJWTClaimKey": "string",
  "authJWTExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTInHTTPQuery": true,
  "api": true,
  "apiAddress": "string",
  "apiEncryption": true,
  "apiServerKey": "string",
  "apiServerCert": "string",
  "apiAllowOrigin": "string",
  "apiTrustedProxies": [
    "string"
  ],
  "metrics": true,
  "metricsAddress": "string",
  "metricsEncryption": true,
  "metricsServerKey": "string",
  "metricsServerCert": "string",
  "metricsAllowOrigin": "string",
  "metricsTrustedProxies": [
    "string"
  ],
  "pprof": true,
  "pprofAddress": "string",
  "pprofEncryption": true,
  "pprofServerKey": "string",
  "pprofServerCert": "string",
  "pprofAllowOrigin": "string",
  "pprofTrustedProxies": [
    "string"
  ],
  "playback": true,
  "playbackAddress": "string",
  "playbackEncryption": true,
  "playbackServerKey": "string",
  "playbackServerCert": "string",
  "playbackAllowOrigin": "string",
  "playbackTrustedProxies": [
    "string"
  ],
  "rtsp": true,
  "rtspTransports": [
    "string"
  ],
  "rtspEncryption": "string",
  "rtspAddress": "string",
  "rtspsAddress": "string",
  "rtpAddress": "string",
  "rtcpAddress": "string",
  "multicastIPRange": "string",
  "multicastRTPPort": 0,
  "multicastRTCPPort": 0,
  "rtspServerKey": "string",
  "rtspServerCert": "string",
  "rtspAuthMethods": [
    "string"
  ],
  "rtmp": true,
  "rtmpAddress": "string",
  "rtmpEncryption": "string",
  "rtmpsAddress": "string",
  "rtmpServerKey": "string",
  "rtmpServerCert": "string",
  "hls": true,
  "hlsAddress": "string",
  "hlsEncryption": true,
  "hlsServerKey": "string",
  "hlsServerCert": "string",
  "hlsAllowOrigin": "string",
  "hlsTrustedProxies": [
    "string"
  ],
  "hlsAlwaysRemux": true,
  "hlsVariant": "string",
  "hlsSegmentCount": 0,
  "hlsSegmentDuration": "string",
  "hlsPartDuration": "string",
  "hlsSegmentMaxSize": "string",
  "hlsDirectory": "string",
  "hlsMuxerCloseAfter": "string",
  "webrtc": true,
  "webrtcAddress": "string",
  "webrtcEncryption": true,
  "webrtcServerKey": "string",
  "webrtcServerCert": "string",
  "webrtcAllowOrigin": "string",
  "webrtcTrustedProxies": [
    "string"
  ],
  "webrtcLocalUDPAddress": "string",
  "webrtcLocalTCPAddress": "string",
  "webrtcIPsFromInterfaces": true,
  "webrtcIPsFromInterfacesList": [
    "string"
  ],
  "webrtcAdditionalHosts": [
    "string"
  ],
  "webrtcICEServers2": [
    {
      "url": "string",
      "username": "string",
      "password": "string",
      "clientOnly": true
    }
  ],
  "webrtcHandshakeTimeout": "string",
  "webrtcTrackGatherTimeout": "string",
  "webrtcSTUNGatherTimeout": "string",
  "srt": true,
  "srtAddress": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[GlobalConf](#schemaglobalconf)| 否 |none|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathDefaultsGet"></a>

## GET returns the default path configuration.

GET /v3/config/pathdefaults/get

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[PathConf](#schemapathconf)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathDefaultsPatch"></a>

## PATCH patches the default path configuration.

PATCH /v3/config/pathdefaults/patch

all fields are optional.

> Body 请求参数

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[PathConf](#schemapathconf)| 否 |none|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsList"></a>

## GET returns all path configurations.

GET /v3/config/paths/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "source": "string",
      "sourceFingerprint": "string",
      "sourceOnDemand": true,
      "sourceOnDemandStartTimeout": "string",
      "sourceOnDemandCloseAfter": "string",
      "maxReaders": 0,
      "srtReadPassphrase": "string",
      "fallback": "string",
      "useAbsoluteTimestamp": true,
      "record": true,
      "recordPath": "string",
      "recordFormat": "string",
      "recordPartDuration": "string",
      "recordSegmentDuration": "string",
      "recordDeleteAfter": "string",
      "overridePublisher": true,
      "srtPublishPassphrase": "string",
      "rtspTransport": "string",
      "rtspAnyPort": true,
      "rtspRangeType": "string",
      "rtspRangeStart": "string",
      "sourceRedirect": "string",
      "rpiCameraCamID": 0,
      "rpiCameraSecondary": true,
      "rpiCameraWidth": 0,
      "rpiCameraHeight": 0,
      "rpiCameraHFlip": true,
      "rpiCameraVFlip": true,
      "rpiCameraBrightness": 0,
      "rpiCameraContrast": 0,
      "rpiCameraSaturation": 0,
      "rpiCameraSharpness": 0,
      "rpiCameraExposure": "string",
      "rpiCameraAWB": "string",
      "rpiCameraAWBGains": [
        0,
        0
      ],
      "rpiCameraDenoise": "string",
      "rpiCameraShutter": 0,
      "rpiCameraMetering": "string",
      "rpiCameraGain": 0,
      "rpiCameraEV": 0,
      "rpiCameraROI": "string",
      "rpiCameraHDR": true,
      "rpiCameraTuningFile": "string",
      "rpiCameraMode": "string",
      "rpiCameraFPS": 0,
      "rpiCameraAfMode": "string",
      "rpiCameraAfRange": "string",
      "rpiCameraAfSpeed": "string",
      "rpiCameraLensPosition": 0,
      "rpiCameraAfWindow": "string",
      "rpiCameraFlickerPeriod": 0,
      "rpiCameraTextOverlayEnable": true,
      "rpiCameraTextOverlay": "string",
      "rpiCameraCodec": "string",
      "rpiCameraIDRPeriod": 0,
      "rpiCameraBitrate": 0,
      "rpiCameraProfile": "string",
      "rpiCameraLevel": "string",
      "rpiCameraJPEGQuality": 0,
      "runOnInit": "string",
      "runOnInitRestart": true,
      "runOnDemand": "string",
      "runOnDemandRestart": true,
      "runOnDemandStartTimeout": "string",
      "runOnDemandCloseAfter": "string",
      "runOnUnDemand": "string",
      "runOnReady": "string",
      "runOnReadyRestart": true,
      "runOnNotReady": "string",
      "runOnRead": "string",
      "runOnReadRestart": true,
      "runOnUnread": "string",
      "runOnRecordSegmentCreate": "string",
      "runOnRecordSegmentComplete": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[PathConfList](#schemapathconflist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsGet"></a>

## GET returns a path configuration.

GET /v3/config/paths/get/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |the name of the path.|

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[PathConf](#schemapathconf)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsAdd"></a>

## POST adds a path configuration.

POST /v3/config/paths/add/{name}

all fields are optional.

> Body 请求参数

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |the name of the path.|
|body|body|[PathConf](#schemapathconf)| 否 |none|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsPatch"></a>

## PATCH patches a path configuration.

PATCH /v3/config/paths/patch/{name}

all fields are optional.

> Body 请求参数

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |the name of the path.|
|body|body|[PathConf](#schemapathconf)| 否 |none|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsReplace"></a>

## POST replaces all values of a path configuration.

POST /v3/config/paths/replace/{name}

all fields are optional.

> Body 请求参数

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |the name of the path.|
|body|body|[PathConf](#schemapathconf)| 否 |none|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdconfigPathsDelete"></a>

## DELETE removes a path configuration.

DELETE /v3/config/paths/delete/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |the name of the path.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# HLS

<a id="opIdhlsMuxersList"></a>

## GET returns all HLS muxers.

GET /v3/hlsmuxers/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "path": "string",
      "created": "string",
      "lastRequest": "string",
      "bytesSent": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[HLSMuxerList](#schemahlsmuxerlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdhlsMuxersGet"></a>

## GET returns a HLS muxer.

GET /v3/hlsmuxers/get/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |name of the muxer.|

> 返回示例

> 200 Response

```json
{
  "path": "string",
  "created": "string",
  "lastRequest": "string",
  "bytesSent": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[HLSMuxer](#schemahlsmuxer)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|muxer not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# Paths

<a id="opIdpathsList"></a>

## GET returns all paths.

GET /v3/paths/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "confName": "string",
      "source": {
        "type": "[",
        "id": "string"
      },
      "ready": true,
      "readyTime": "string",
      "tracks": [
        "string"
      ],
      "bytesReceived": 0,
      "bytesSent": 0,
      "readers": [
        {
          "type": "hlsMuxer",
          "id": "string"
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[PathList](#schemapathlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdpathsGet"></a>

## GET returns a path.

GET /v3/paths/get/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |name of the path.|

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "confName": "string",
  "source": {
    "type": "hlsSource",
    "id": "string"
  },
  "ready": true,
  "readyTime": "string",
  "tracks": [
    "string"
  ],
  "bytesReceived": 0,
  "bytesSent": 0,
  "readers": [
    {
      "type": "hlsMuxer",
      "id": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[Path](#schemapath)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# RTSP

<a id="opIdrtspConnsList"></a>

## GET returns all RTSP connections.

GET /v3/rtspconns/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "session": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPConnList](#schemartspconnlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspConnsGet"></a>

## GET returns a RTSP connection.

GET /v3/rtspconns/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "session": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPConn](#schemartspconn)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspSessionsList"></a>

## GET returns all RTSP sessions.

GET /v3/rtspsessions/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "transport": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "rtpPacketsReceived": 0,
      "rtpPacketsSent": 0,
      "rtpPacketsLost": 0,
      "rtpPacketsInError": 0,
      "rtpPacketsJitter": 0,
      "rtcpPacketsReceived": 0,
      "rtcpPacketsSent": 0,
      "rtcpPacketsInError": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPSessionList](#schemartspsessionlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspSessionsGet"></a>

## GET returns a RTSP session.

GET /v3/rtspsessions/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "transport": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "rtpPacketsReceived": 0,
  "rtpPacketsSent": 0,
  "rtpPacketsLost": 0,
  "rtpPacketsInError": 0,
  "rtpPacketsJitter": 0,
  "rtcpPacketsReceived": 0,
  "rtcpPacketsSent": 0,
  "rtcpPacketsInError": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPSession](#schemartspsession)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspSessionsKick"></a>

## POST kicks out a RTSP session from the server.

POST /v3/rtspsessions/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the session.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspsConnsList"></a>

## GET returns all RTSPS connections.

GET /v3/rtspsconns/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "session": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPConnList](#schemartspconnlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspsConnsGet"></a>

## GET returns a RTSPS connection.

GET /v3/rtspsconns/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "session": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPConn](#schemartspconn)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspsSessionsList"></a>

## GET returns all RTSPS sessions.

GET /v3/rtspssessions/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "transport": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "rtpPacketsReceived": 0,
      "rtpPacketsSent": 0,
      "rtpPacketsLost": 0,
      "rtpPacketsInError": 0,
      "rtpPacketsJitter": 0,
      "rtcpPacketsReceived": 0,
      "rtcpPacketsSent": 0,
      "rtcpPacketsInError": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPSessionList](#schemartspsessionlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspsSessionsGet"></a>

## GET returns a RTSPS session.

GET /v3/rtspssessions/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "transport": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "rtpPacketsReceived": 0,
  "rtpPacketsSent": 0,
  "rtpPacketsLost": 0,
  "rtpPacketsInError": 0,
  "rtpPacketsJitter": 0,
  "rtcpPacketsReceived": 0,
  "rtcpPacketsSent": 0,
  "rtcpPacketsInError": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTSPSession](#schemartspsession)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtspsSessionsKick"></a>

## POST kicks out a RTSPS session from the server.

POST /v3/rtspssessions/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the session.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# RTMP

<a id="opIdrtmpConnsList"></a>

## GET returns all RTMP connections.

GET /v3/rtmpconns/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "bytesReceived": 0,
      "bytesSent": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTMPConnList](#schemartmpconnlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtmpConnectionsGet"></a>

## GET returns a RTMP connection.

GET /v3/rtmpconns/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "bytesReceived": 0,
  "bytesSent": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTMPConn](#schemartmpconn)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtmpConnsKick"></a>

## POST kicks out a RTMP connection from the server.

POST /v3/rtmpconns/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtmpsConnsList"></a>

## GET returns all RTMPS connections.

GET /v3/rtmpsconns/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "bytesReceived": 0,
      "bytesSent": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTMPConnList](#schemartmpconnlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtmpsConnectionsGet"></a>

## GET returns a RTMPS connection.

GET /v3/rtmpsconns/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "bytesReceived": 0,
  "bytesSent": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RTMPConn](#schemartmpconn)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrtmpsConnsKick"></a>

## POST kicks out a RTMPS connection from the server.

POST /v3/rtmpsconns/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# SRT

<a id="opIdsrtConnsList"></a>

## GET returns all SRT connections.

GET /v3/srtconns/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "packetsSent": 0,
      "packetsReceived": 0,
      "packetsReceivedBelated": 0,
      "packetsSentUnique": 0,
      "packetsReceivedUnique": 0,
      "packetsSendLoss": 0,
      "packetsReceivedLoss": 0,
      "packetsRetrans": 0,
      "packetsReceivedRetrans": 0,
      "packetsSentACK": 0,
      "packetsReceivedACK": 0,
      "packetsSentNAK": 0,
      "packetsReceivedNAK": 0,
      "packetsSentKM": 0,
      "packetsReceivedKM": 0,
      "usSndDuration": 0,
      "packetsSendDrop": 0,
      "packetsReceivedDrop": 0,
      "packetsReceivedUndecrypt": 0,
      "bytesSent": 0,
      "bytesReceived": 0,
      "bytesReceivedBelated": 0,
      "bytesSentUnique": 0,
      "bytesReceivedUnique": 0,
      "bytesReceivedLoss": 0,
      "bytesRetrans": 0,
      "bytesReceivedRetrans": 0,
      "bytesSendDrop": 0,
      "bytesReceivedDrop": 0,
      "bytesReceivedUndecrypt": 0,
      "usPacketsSendPeriod": 0,
      "packetsFlowWindow": 0,
      "packetsFlightSize": 0,
      "msRTT": 0,
      "mbpsSendRate": 0,
      "mbpsReceiveRate": 0,
      "mbpsLinkCapacity": 0,
      "bytesAvailSendBuf": 0,
      "bytesAvailReceiveBuf": 0,
      "mbpsMaxBW": 0,
      "byteMSS": 0,
      "packetsSendBuf": 0,
      "bytesSendBuf": 0,
      "msSendBuf": 0,
      "msSendTsbPdDelay": 0,
      "packetsReceiveBuf": 0,
      "bytesReceiveBuf": 0,
      "msReceiveBuf": 0,
      "msReceiveTsbPdDelay": 0,
      "packetsReorderTolerance": 0,
      "packetsReceivedAvgBelatedTime": 0,
      "packetsSendLossRate": 0,
      "packetsReceivedLossRate": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[SRTConnList](#schemasrtconnlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdsrtConnsGet"></a>

## GET returns a SRT connection.

GET /v3/srtconns/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "packetsSent": 0,
  "packetsReceived": 0,
  "packetsReceivedBelated": 0,
  "packetsSentUnique": 0,
  "packetsReceivedUnique": 0,
  "packetsSendLoss": 0,
  "packetsReceivedLoss": 0,
  "packetsRetrans": 0,
  "packetsReceivedRetrans": 0,
  "packetsSentACK": 0,
  "packetsReceivedACK": 0,
  "packetsSentNAK": 0,
  "packetsReceivedNAK": 0,
  "packetsSentKM": 0,
  "packetsReceivedKM": 0,
  "usSndDuration": 0,
  "packetsSendDrop": 0,
  "packetsReceivedDrop": 0,
  "packetsReceivedUndecrypt": 0,
  "bytesSent": 0,
  "bytesReceived": 0,
  "bytesReceivedBelated": 0,
  "bytesSentUnique": 0,
  "bytesReceivedUnique": 0,
  "bytesReceivedLoss": 0,
  "bytesRetrans": 0,
  "bytesReceivedRetrans": 0,
  "bytesSendDrop": 0,
  "bytesReceivedDrop": 0,
  "bytesReceivedUndecrypt": 0,
  "usPacketsSendPeriod": 0,
  "packetsFlowWindow": 0,
  "packetsFlightSize": 0,
  "msRTT": 0,
  "mbpsSendRate": 0,
  "mbpsReceiveRate": 0,
  "mbpsLinkCapacity": 0,
  "bytesAvailSendBuf": 0,
  "bytesAvailReceiveBuf": 0,
  "mbpsMaxBW": 0,
  "byteMSS": 0,
  "packetsSendBuf": 0,
  "bytesSendBuf": 0,
  "msSendBuf": 0,
  "msSendTsbPdDelay": 0,
  "packetsReceiveBuf": 0,
  "bytesReceiveBuf": 0,
  "msReceiveBuf": 0,
  "msReceiveTsbPdDelay": 0,
  "packetsReorderTolerance": 0,
  "packetsReceivedAvgBelatedTime": 0,
  "packetsSendLossRate": 0,
  "packetsReceivedLossRate": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[SRTConn](#schemasrtconn)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdsrtConnsKick"></a>

## POST kicks out a SRT connection from the server.

POST /v3/srtconns/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the connection.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# WebRTC

<a id="opIdwebrtcSessionsList"></a>

## GET returns all WebRTC sessions.

GET /v3/webrtcsessions/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "peerConnectionEstablished": true,
      "localCandidate": "string",
      "remoteCandidate": "string",
      "state": "read",
      "path": "string",
      "query": "string",
      "bytesReceived": 0,
      "bytesSent": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[WebRTCSessionList](#schemawebrtcsessionlist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdwebrtcSessionsGet"></a>

## GET returns a WebRTC session.

GET /v3/webrtcsessions/get/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the session.|

> 返回示例

> 200 Response

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "peerConnectionEstablished": true,
  "localCandidate": "string",
  "remoteCandidate": "string",
  "state": "read",
  "path": "string",
  "query": "string",
  "bytesReceived": 0,
  "bytesSent": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[WebRTCSession](#schemawebrtcsession)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdwebrtcSessionsKick"></a>

## POST kicks out a WebRTC session from the server.

POST /v3/webrtcsessions/kick/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |ID of the session.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|session not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# Recordings

<a id="opIdrecordingsList"></a>

## GET returns all recordings.

GET /v3/recordings/list

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |page number.|
|itemsPerPage|query|integer| 否 |items per page.|

> 返回示例

> 200 Response

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "segments": [
        {
          "start": "string"
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[RecordingList](#schemarecordinglist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrecordingsGet"></a>

## GET returns recordings for a path.

GET /v3/recordings/get/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |name of the path.|

> 返回示例

> 200 Response

```json
{
  "name": "string",
  "segments": [
    {
      "start": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|[Recording](#schemarecording)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|path not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

<a id="opIdrecordingsDeleteSegment"></a>

## DELETE deletes a recording segment.

DELETE /v3/recordings/deletesegment

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|path|query|string| 是 |path.|
|start|query|string| 是 |starting date of the segment.|

> 返回示例

> 400 Response

```json
{
  "error": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|the request was successful.|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|invalid request.|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|connection not found.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|server error.|[Error](#schemaerror)|

# 数据模型

<h2 id="tocS_Error">Error</h2>

<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "error": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|error|string|false|none||none|

<h2 id="tocS_AuthInternalUser">AuthInternalUser</h2>

<a id="schemaauthinternaluser"></a>
<a id="schema_AuthInternalUser"></a>
<a id="tocSauthinternaluser"></a>
<a id="tocsauthinternaluser"></a>

```json
{
  "user": "string",
  "pass": "string",
  "ips": [
    "string"
  ],
  "permissions": [
    {
      "action": "string",
      "path": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user|string|false|none||none|
|pass|string|false|none||none|
|ips|[string]|false|none||none|
|permissions|[[AuthInternalUserPermission](#schemaauthinternaluserpermission)]|false|none||none|

<h2 id="tocS_AuthInternalUserPermission">AuthInternalUserPermission</h2>

<a id="schemaauthinternaluserpermission"></a>
<a id="schema_AuthInternalUserPermission"></a>
<a id="tocSauthinternaluserpermission"></a>
<a id="tocsauthinternaluserpermission"></a>

```json
{
  "action": "string",
  "path": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|action|string|false|none||none|
|path|string|false|none||none|

<h2 id="tocS_GlobalConf">GlobalConf</h2>

<a id="schemaglobalconf"></a>
<a id="schema_GlobalConf"></a>
<a id="tocSglobalconf"></a>
<a id="tocsglobalconf"></a>

```json
{
  "logLevel": "string",
  "logDestinations": [
    "string"
  ],
  "logFile": "string",
  "sysLogPrefix": "string",
  "readTimeout": "string",
  "writeTimeout": "string",
  "writeQueueSize": 0,
  "udpMaxPayloadSize": 0,
  "runOnConnect": "string",
  "runOnConnectRestart": true,
  "runOnDisconnect": "string",
  "authMethod": "string",
  "authInternalUsers": [
    {
      "user": "string",
      "pass": "string",
      "ips": [
        "string"
      ],
      "permissions": [
        {
          "action": "string",
          "path": "string"
        }
      ]
    }
  ],
  "authHTTPAddress": "string",
  "authHTTPExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTJWKS": "string",
  "authJWTJWKSFingerprint": "string",
  "authJWTClaimKey": "string",
  "authJWTExclude": [
    {
      "action": "string",
      "path": "string"
    }
  ],
  "authJWTInHTTPQuery": true,
  "api": true,
  "apiAddress": "string",
  "apiEncryption": true,
  "apiServerKey": "string",
  "apiServerCert": "string",
  "apiAllowOrigin": "string",
  "apiTrustedProxies": [
    "string"
  ],
  "metrics": true,
  "metricsAddress": "string",
  "metricsEncryption": true,
  "metricsServerKey": "string",
  "metricsServerCert": "string",
  "metricsAllowOrigin": "string",
  "metricsTrustedProxies": [
    "string"
  ],
  "pprof": true,
  "pprofAddress": "string",
  "pprofEncryption": true,
  "pprofServerKey": "string",
  "pprofServerCert": "string",
  "pprofAllowOrigin": "string",
  "pprofTrustedProxies": [
    "string"
  ],
  "playback": true,
  "playbackAddress": "string",
  "playbackEncryption": true,
  "playbackServerKey": "string",
  "playbackServerCert": "string",
  "playbackAllowOrigin": "string",
  "playbackTrustedProxies": [
    "string"
  ],
  "rtsp": true,
  "rtspTransports": [
    "string"
  ],
  "rtspEncryption": "string",
  "rtspAddress": "string",
  "rtspsAddress": "string",
  "rtpAddress": "string",
  "rtcpAddress": "string",
  "multicastIPRange": "string",
  "multicastRTPPort": 0,
  "multicastRTCPPort": 0,
  "rtspServerKey": "string",
  "rtspServerCert": "string",
  "rtspAuthMethods": [
    "string"
  ],
  "rtmp": true,
  "rtmpAddress": "string",
  "rtmpEncryption": "string",
  "rtmpsAddress": "string",
  "rtmpServerKey": "string",
  "rtmpServerCert": "string",
  "hls": true,
  "hlsAddress": "string",
  "hlsEncryption": true,
  "hlsServerKey": "string",
  "hlsServerCert": "string",
  "hlsAllowOrigin": "string",
  "hlsTrustedProxies": [
    "string"
  ],
  "hlsAlwaysRemux": true,
  "hlsVariant": "string",
  "hlsSegmentCount": 0,
  "hlsSegmentDuration": "string",
  "hlsPartDuration": "string",
  "hlsSegmentMaxSize": "string",
  "hlsDirectory": "string",
  "hlsMuxerCloseAfter": "string",
  "webrtc": true,
  "webrtcAddress": "string",
  "webrtcEncryption": true,
  "webrtcServerKey": "string",
  "webrtcServerCert": "string",
  "webrtcAllowOrigin": "string",
  "webrtcTrustedProxies": [
    "string"
  ],
  "webrtcLocalUDPAddress": "string",
  "webrtcLocalTCPAddress": "string",
  "webrtcIPsFromInterfaces": true,
  "webrtcIPsFromInterfacesList": [
    "string"
  ],
  "webrtcAdditionalHosts": [
    "string"
  ],
  "webrtcICEServers2": [
    {
      "url": "string",
      "username": "string",
      "password": "string",
      "clientOnly": true
    }
  ],
  "webrtcHandshakeTimeout": "string",
  "webrtcTrackGatherTimeout": "string",
  "webrtcSTUNGatherTimeout": "string",
  "srt": true,
  "srtAddress": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|logLevel|string|false|none||none|
|logDestinations|[string]|false|none||none|
|logFile|string|false|none||none|
|sysLogPrefix|string|false|none||none|
|readTimeout|string|false|none||none|
|writeTimeout|string|false|none||none|
|writeQueueSize|integer|false|none||none|
|udpMaxPayloadSize|integer|false|none||none|
|runOnConnect|string|false|none||none|
|runOnConnectRestart|boolean|false|none||none|
|runOnDisconnect|string|false|none||none|
|authMethod|string|false|none||none|
|authInternalUsers|[[AuthInternalUser](#schemaauthinternaluser)]|false|none||none|
|authHTTPAddress|string|false|none||none|
|authHTTPExclude|[[AuthInternalUserPermission](#schemaauthinternaluserpermission)]|false|none||none|
|authJWTJWKS|string|false|none||none|
|authJWTJWKSFingerprint|string|false|none||none|
|authJWTClaimKey|string|false|none||none|
|authJWTExclude|[[AuthInternalUserPermission](#schemaauthinternaluserpermission)]|false|none||none|
|authJWTInHTTPQuery|boolean|false|none||none|
|api|boolean|false|none||none|
|apiAddress|string|false|none||none|
|apiEncryption|boolean|false|none||none|
|apiServerKey|string|false|none||none|
|apiServerCert|string|false|none||none|
|apiAllowOrigin|string|false|none||none|
|apiTrustedProxies|[string]|false|none||none|
|metrics|boolean|false|none||none|
|metricsAddress|string|false|none||none|
|metricsEncryption|boolean|false|none||none|
|metricsServerKey|string|false|none||none|
|metricsServerCert|string|false|none||none|
|metricsAllowOrigin|string|false|none||none|
|metricsTrustedProxies|[string]|false|none||none|
|pprof|boolean|false|none||none|
|pprofAddress|string|false|none||none|
|pprofEncryption|boolean|false|none||none|
|pprofServerKey|string|false|none||none|
|pprofServerCert|string|false|none||none|
|pprofAllowOrigin|string|false|none||none|
|pprofTrustedProxies|[string]|false|none||none|
|playback|boolean|false|none||none|
|playbackAddress|string|false|none||none|
|playbackEncryption|boolean|false|none||none|
|playbackServerKey|string|false|none||none|
|playbackServerCert|string|false|none||none|
|playbackAllowOrigin|string|false|none||none|
|playbackTrustedProxies|[string]|false|none||none|
|rtsp|boolean|false|none||none|
|rtspTransports|[string]|false|none||none|
|rtspEncryption|string|false|none||none|
|rtspAddress|string|false|none||none|
|rtspsAddress|string|false|none||none|
|rtpAddress|string|false|none||none|
|rtcpAddress|string|false|none||none|
|multicastIPRange|string|false|none||none|
|multicastRTPPort|integer|false|none||none|
|multicastRTCPPort|integer|false|none||none|
|rtspServerKey|string|false|none||none|
|rtspServerCert|string|false|none||none|
|rtspAuthMethods|[string]|false|none||none|
|rtmp|boolean|false|none||none|
|rtmpAddress|string|false|none||none|
|rtmpEncryption|string|false|none||none|
|rtmpsAddress|string|false|none||none|
|rtmpServerKey|string|false|none||none|
|rtmpServerCert|string|false|none||none|
|hls|boolean|false|none||none|
|hlsAddress|string|false|none||none|
|hlsEncryption|boolean|false|none||none|
|hlsServerKey|string|false|none||none|
|hlsServerCert|string|false|none||none|
|hlsAllowOrigin|string|false|none||none|
|hlsTrustedProxies|[string]|false|none||none|
|hlsAlwaysRemux|boolean|false|none||none|
|hlsVariant|string|false|none||none|
|hlsSegmentCount|integer|false|none||none|
|hlsSegmentDuration|string|false|none||none|
|hlsPartDuration|string|false|none||none|
|hlsSegmentMaxSize|string|false|none||none|
|hlsDirectory|string|false|none||none|
|hlsMuxerCloseAfter|string|false|none||none|
|webrtc|boolean|false|none||none|
|webrtcAddress|string|false|none||none|
|webrtcEncryption|boolean|false|none||none|
|webrtcServerKey|string|false|none||none|
|webrtcServerCert|string|false|none||none|
|webrtcAllowOrigin|string|false|none||none|
|webrtcTrustedProxies|[string]|false|none||none|
|webrtcLocalUDPAddress|string|false|none||none|
|webrtcLocalTCPAddress|string|false|none||none|
|webrtcIPsFromInterfaces|boolean|false|none||none|
|webrtcIPsFromInterfacesList|[string]|false|none||none|
|webrtcAdditionalHosts|[string]|false|none||none|
|webrtcICEServers2|[object]|false|none||none|
|» url|string|false|none||none|
|» username|string|false|none||none|
|» password|string|false|none||none|
|» clientOnly|boolean|false|none||none|
|webrtcHandshakeTimeout|string|false|none||none|
|webrtcTrackGatherTimeout|string|false|none||none|
|webrtcSTUNGatherTimeout|string|false|none||none|
|srt|boolean|false|none||none|
|srtAddress|string|false|none||none|

<h2 id="tocS_PathConf">PathConf</h2>

<a id="schemapathconf"></a>
<a id="schema_PathConf"></a>
<a id="tocSpathconf"></a>
<a id="tocspathconf"></a>

```json
{
  "name": "string",
  "source": "string",
  "sourceFingerprint": "string",
  "sourceOnDemand": true,
  "sourceOnDemandStartTimeout": "string",
  "sourceOnDemandCloseAfter": "string",
  "maxReaders": 0,
  "srtReadPassphrase": "string",
  "fallback": "string",
  "useAbsoluteTimestamp": true,
  "record": true,
  "recordPath": "string",
  "recordFormat": "string",
  "recordPartDuration": "string",
  "recordSegmentDuration": "string",
  "recordDeleteAfter": "string",
  "overridePublisher": true,
  "srtPublishPassphrase": "string",
  "rtspTransport": "string",
  "rtspAnyPort": true,
  "rtspRangeType": "string",
  "rtspRangeStart": "string",
  "sourceRedirect": "string",
  "rpiCameraCamID": 0,
  "rpiCameraSecondary": true,
  "rpiCameraWidth": 0,
  "rpiCameraHeight": 0,
  "rpiCameraHFlip": true,
  "rpiCameraVFlip": true,
  "rpiCameraBrightness": 0,
  "rpiCameraContrast": 0,
  "rpiCameraSaturation": 0,
  "rpiCameraSharpness": 0,
  "rpiCameraExposure": "string",
  "rpiCameraAWB": "string",
  "rpiCameraAWBGains": [
    0,
    0
  ],
  "rpiCameraDenoise": "string",
  "rpiCameraShutter": 0,
  "rpiCameraMetering": "string",
  "rpiCameraGain": 0,
  "rpiCameraEV": 0,
  "rpiCameraROI": "string",
  "rpiCameraHDR": true,
  "rpiCameraTuningFile": "string",
  "rpiCameraMode": "string",
  "rpiCameraFPS": 0,
  "rpiCameraAfMode": "string",
  "rpiCameraAfRange": "string",
  "rpiCameraAfSpeed": "string",
  "rpiCameraLensPosition": 0,
  "rpiCameraAfWindow": "string",
  "rpiCameraFlickerPeriod": 0,
  "rpiCameraTextOverlayEnable": true,
  "rpiCameraTextOverlay": "string",
  "rpiCameraCodec": "string",
  "rpiCameraIDRPeriod": 0,
  "rpiCameraBitrate": 0,
  "rpiCameraProfile": "string",
  "rpiCameraLevel": "string",
  "rpiCameraJPEGQuality": 0,
  "runOnInit": "string",
  "runOnInitRestart": true,
  "runOnDemand": "string",
  "runOnDemandRestart": true,
  "runOnDemandStartTimeout": "string",
  "runOnDemandCloseAfter": "string",
  "runOnUnDemand": "string",
  "runOnReady": "string",
  "runOnReadyRestart": true,
  "runOnNotReady": "string",
  "runOnRead": "string",
  "runOnReadRestart": true,
  "runOnUnread": "string",
  "runOnRecordSegmentCreate": "string",
  "runOnRecordSegmentComplete": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||none|
|source|string|false|none||none|
|sourceFingerprint|string|false|none||none|
|sourceOnDemand|boolean|false|none||none|
|sourceOnDemandStartTimeout|string|false|none||none|
|sourceOnDemandCloseAfter|string|false|none||none|
|maxReaders|integer|false|none||none|
|srtReadPassphrase|string|false|none||none|
|fallback|string|false|none||none|
|useAbsoluteTimestamp|boolean|false|none||none|
|record|boolean|false|none||none|
|recordPath|string|false|none||none|
|recordFormat|string|false|none||none|
|recordPartDuration|string|false|none||none|
|recordSegmentDuration|string|false|none||none|
|recordDeleteAfter|string|false|none||none|
|overridePublisher|boolean|false|none||none|
|srtPublishPassphrase|string|false|none||none|
|rtspTransport|string|false|none||none|
|rtspAnyPort|boolean|false|none||none|
|rtspRangeType|string|false|none||none|
|rtspRangeStart|string|false|none||none|
|sourceRedirect|string|false|none||none|
|rpiCameraCamID|integer|false|none||none|
|rpiCameraSecondary|boolean|false|none||none|
|rpiCameraWidth|integer|false|none||none|
|rpiCameraHeight|integer|false|none||none|
|rpiCameraHFlip|boolean|false|none||none|
|rpiCameraVFlip|boolean|false|none||none|
|rpiCameraBrightness|number|false|none||none|
|rpiCameraContrast|number|false|none||none|
|rpiCameraSaturation|number|false|none||none|
|rpiCameraSharpness|number|false|none||none|
|rpiCameraExposure|string|false|none||none|
|rpiCameraAWB|string|false|none||none|
|rpiCameraAWBGains|[number]|false|none||none|
|rpiCameraDenoise|string|false|none||none|
|rpiCameraShutter|integer|false|none||none|
|rpiCameraMetering|string|false|none||none|
|rpiCameraGain|number|false|none||none|
|rpiCameraEV|number|false|none||none|
|rpiCameraROI|string|false|none||none|
|rpiCameraHDR|boolean|false|none||none|
|rpiCameraTuningFile|string|false|none||none|
|rpiCameraMode|string|false|none||none|
|rpiCameraFPS|number|false|none||none|
|rpiCameraAfMode|string|false|none||none|
|rpiCameraAfRange|string|false|none||none|
|rpiCameraAfSpeed|string|false|none||none|
|rpiCameraLensPosition|number|false|none||none|
|rpiCameraAfWindow|string|false|none||none|
|rpiCameraFlickerPeriod|integer|false|none||none|
|rpiCameraTextOverlayEnable|boolean|false|none||none|
|rpiCameraTextOverlay|string|false|none||none|
|rpiCameraCodec|string|false|none||none|
|rpiCameraIDRPeriod|integer|false|none||none|
|rpiCameraBitrate|integer|false|none||none|
|rpiCameraProfile|string|false|none||none|
|rpiCameraLevel|string|false|none||none|
|rpiCameraJPEGQuality|integer|false|none||none|
|runOnInit|string|false|none||none|
|runOnInitRestart|boolean|false|none||none|
|runOnDemand|string|false|none||none|
|runOnDemandRestart|boolean|false|none||none|
|runOnDemandStartTimeout|string|false|none||none|
|runOnDemandCloseAfter|string|false|none||none|
|runOnUnDemand|string|false|none||none|
|runOnReady|string|false|none||none|
|runOnReadyRestart|boolean|false|none||none|
|runOnNotReady|string|false|none||none|
|runOnRead|string|false|none||none|
|runOnReadRestart|boolean|false|none||none|
|runOnUnread|string|false|none||none|
|runOnRecordSegmentCreate|string|false|none||none|
|runOnRecordSegmentComplete|string|false|none||none|

<h2 id="tocS_PathConfList">PathConfList</h2>

<a id="schemapathconflist"></a>
<a id="schema_PathConfList"></a>
<a id="tocSpathconflist"></a>
<a id="tocspathconflist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "source": "string",
      "sourceFingerprint": "string",
      "sourceOnDemand": true,
      "sourceOnDemandStartTimeout": "string",
      "sourceOnDemandCloseAfter": "string",
      "maxReaders": 0,
      "srtReadPassphrase": "string",
      "fallback": "string",
      "useAbsoluteTimestamp": true,
      "record": true,
      "recordPath": "string",
      "recordFormat": "string",
      "recordPartDuration": "string",
      "recordSegmentDuration": "string",
      "recordDeleteAfter": "string",
      "overridePublisher": true,
      "srtPublishPassphrase": "string",
      "rtspTransport": "string",
      "rtspAnyPort": true,
      "rtspRangeType": "string",
      "rtspRangeStart": "string",
      "sourceRedirect": "string",
      "rpiCameraCamID": 0,
      "rpiCameraSecondary": true,
      "rpiCameraWidth": 0,
      "rpiCameraHeight": 0,
      "rpiCameraHFlip": true,
      "rpiCameraVFlip": true,
      "rpiCameraBrightness": 0,
      "rpiCameraContrast": 0,
      "rpiCameraSaturation": 0,
      "rpiCameraSharpness": 0,
      "rpiCameraExposure": "string",
      "rpiCameraAWB": "string",
      "rpiCameraAWBGains": [
        0,
        0
      ],
      "rpiCameraDenoise": "string",
      "rpiCameraShutter": 0,
      "rpiCameraMetering": "string",
      "rpiCameraGain": 0,
      "rpiCameraEV": 0,
      "rpiCameraROI": "string",
      "rpiCameraHDR": true,
      "rpiCameraTuningFile": "string",
      "rpiCameraMode": "string",
      "rpiCameraFPS": 0,
      "rpiCameraAfMode": "string",
      "rpiCameraAfRange": "string",
      "rpiCameraAfSpeed": "string",
      "rpiCameraLensPosition": 0,
      "rpiCameraAfWindow": "string",
      "rpiCameraFlickerPeriod": 0,
      "rpiCameraTextOverlayEnable": true,
      "rpiCameraTextOverlay": "string",
      "rpiCameraCodec": "string",
      "rpiCameraIDRPeriod": 0,
      "rpiCameraBitrate": 0,
      "rpiCameraProfile": "string",
      "rpiCameraLevel": "string",
      "rpiCameraJPEGQuality": 0,
      "runOnInit": "string",
      "runOnInitRestart": true,
      "runOnDemand": "string",
      "runOnDemandRestart": true,
      "runOnDemandStartTimeout": "string",
      "runOnDemandCloseAfter": "string",
      "runOnUnDemand": "string",
      "runOnReady": "string",
      "runOnReadyRestart": true,
      "runOnNotReady": "string",
      "runOnRead": "string",
      "runOnReadRestart": true,
      "runOnUnread": "string",
      "runOnRecordSegmentCreate": "string",
      "runOnRecordSegmentComplete": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[PathConf](#schemapathconf)]|false|none||none|

<h2 id="tocS_Path">Path</h2>

<a id="schemapath"></a>
<a id="schema_Path"></a>
<a id="tocSpath"></a>
<a id="tocspath"></a>

```json
{
  "name": "string",
  "confName": "string",
  "source": {
    "type": "hlsSource",
    "id": "string"
  },
  "ready": true,
  "readyTime": "string",
  "tracks": [
    "string"
  ],
  "bytesReceived": 0,
  "bytesSent": 0,
  "readers": [
    {
      "type": "hlsMuxer",
      "id": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||none|
|confName|string|false|none||none|
|source|any|false|none||none|

oneOf

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» *anonymous*|[PathSource](#schemapathsource)|false|none||none|

xor

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|ready|boolean|false|none||none|
|readyTime|string¦null|false|none||none|
|tracks|[string]|false|none||none|
|bytesReceived|integer(int64)|false|none||none|
|bytesSent|integer(int64)|false|none||none|
|readers|[[PathReader](#schemapathreader)]|false|none||none|

<h2 id="tocS_PathList">PathList</h2>

<a id="schemapathlist"></a>
<a id="schema_PathList"></a>
<a id="tocSpathlist"></a>
<a id="tocspathlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "confName": "string",
      "source": {
        "type": "[",
        "id": "string"
      },
      "ready": true,
      "readyTime": "string",
      "tracks": [
        "string"
      ],
      "bytesReceived": 0,
      "bytesSent": 0,
      "readers": [
        {
          "type": "hlsMuxer",
          "id": "string"
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[Path](#schemapath)]|false|none||none|

<h2 id="tocS_PathSource">PathSource</h2>

<a id="schemapathsource"></a>
<a id="schema_PathSource"></a>
<a id="tocSpathsource"></a>
<a id="tocspathsource"></a>

```json
{
  "type": "hlsSource",
  "id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|type|string|false|none||none|
|id|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|type|hlsSource|
|type|redirect|
|type|rpiCameraSource|
|type|rtmpConn|
|type|rtmpSource|
|type|rtspSession|
|type|rtspSource|
|type|rtspsSession|
|type|srtConn|
|type|srtSource|
|type|udpSource|
|type|webRTCSession|
|type|webRTCSource|

<h2 id="tocS_PathReader">PathReader</h2>

<a id="schemapathreader"></a>
<a id="schema_PathReader"></a>
<a id="tocSpathreader"></a>
<a id="tocspathreader"></a>

```json
{
  "type": "hlsMuxer",
  "id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|type|string|false|none||none|
|id|string|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|type|hlsMuxer|
|type|rtmpConn|
|type|rtspSession|
|type|rtspsSession|
|type|srtConn|
|type|webRTCSession|

<h2 id="tocS_HLSMuxer">HLSMuxer</h2>

<a id="schemahlsmuxer"></a>
<a id="schema_HLSMuxer"></a>
<a id="tocShlsmuxer"></a>
<a id="tocshlsmuxer"></a>

```json
{
  "path": "string",
  "created": "string",
  "lastRequest": "string",
  "bytesSent": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|path|string|false|none||none|
|created|string|false|none||none|
|lastRequest|string|false|none||none|
|bytesSent|integer(int64)|false|none||none|

<h2 id="tocS_HLSMuxerList">HLSMuxerList</h2>

<a id="schemahlsmuxerlist"></a>
<a id="schema_HLSMuxerList"></a>
<a id="tocShlsmuxerlist"></a>
<a id="tocshlsmuxerlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "path": "string",
      "created": "string",
      "lastRequest": "string",
      "bytesSent": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[HLSMuxer](#schemahlsmuxer)]|false|none||none|

<h2 id="tocS_Recording">Recording</h2>

<a id="schemarecording"></a>
<a id="schema_Recording"></a>
<a id="tocSrecording"></a>
<a id="tocsrecording"></a>

```json
{
  "name": "string",
  "segments": [
    {
      "start": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||none|
|segments|[[RecordingSegment](#schemarecordingsegment)]|false|none||none|

<h2 id="tocS_RecordingList">RecordingList</h2>

<a id="schemarecordinglist"></a>
<a id="schema_RecordingList"></a>
<a id="tocSrecordinglist"></a>
<a id="tocsrecordinglist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "name": "string",
      "segments": [
        {
          "start": "string"
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[Recording](#schemarecording)]|false|none||none|

<h2 id="tocS_RecordingSegment">RecordingSegment</h2>

<a id="schemarecordingsegment"></a>
<a id="schema_RecordingSegment"></a>
<a id="tocSrecordingsegment"></a>
<a id="tocsrecordingsegment"></a>

```json
{
  "start": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|start|string|false|none||none|

<h2 id="tocS_RTMPConn">RTMPConn</h2>

<a id="schemartmpconn"></a>
<a id="schema_RTMPConn"></a>
<a id="tocSrtmpconn"></a>
<a id="tocsrtmpconn"></a>

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "bytesReceived": 0,
  "bytesSent": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|created|string|false|none||none|
|remoteAddr|string|false|none||none|
|state|string|false|none||none|
|path|string|false|none||none|
|query|string|false|none||none|
|bytesReceived|integer(int64)|false|none||none|
|bytesSent|integer(int64)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|state|idle|
|state|read|
|state|publish|

<h2 id="tocS_RTMPConnList">RTMPConnList</h2>

<a id="schemartmpconnlist"></a>
<a id="schema_RTMPConnList"></a>
<a id="tocSrtmpconnlist"></a>
<a id="tocsrtmpconnlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "bytesReceived": 0,
      "bytesSent": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[RTMPConn](#schemartmpconn)]|false|none||none|

<h2 id="tocS_RTSPConn">RTSPConn</h2>

<a id="schemartspconn"></a>
<a id="schema_RTSPConn"></a>
<a id="tocSrtspconn"></a>
<a id="tocsrtspconn"></a>

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "session": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|created|string|false|none||none|
|remoteAddr|string|false|none||none|
|bytesReceived|integer(int64)|false|none||none|
|bytesSent|integer(int64)|false|none||none|
|session|string¦null|false|none||none|

<h2 id="tocS_RTSPConnList">RTSPConnList</h2>

<a id="schemartspconnlist"></a>
<a id="schema_RTSPConnList"></a>
<a id="tocSrtspconnlist"></a>
<a id="tocsrtspconnlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "session": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[RTSPConn](#schemartspconn)]|false|none||none|

<h2 id="tocS_RTSPSession">RTSPSession</h2>

<a id="schemartspsession"></a>
<a id="schema_RTSPSession"></a>
<a id="tocSrtspsession"></a>
<a id="tocsrtspsession"></a>

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "transport": "string",
  "bytesReceived": 0,
  "bytesSent": 0,
  "rtpPacketsReceived": 0,
  "rtpPacketsSent": 0,
  "rtpPacketsLost": 0,
  "rtpPacketsInError": 0,
  "rtpPacketsJitter": 0,
  "rtcpPacketsReceived": 0,
  "rtcpPacketsSent": 0,
  "rtcpPacketsInError": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|created|string|false|none||none|
|remoteAddr|string|false|none||none|
|state|string|false|none||none|
|path|string|false|none||none|
|query|string|false|none||none|
|transport|string¦null|false|none||none|
|bytesReceived|integer(int64)|false|none||none|
|bytesSent|integer(int64)|false|none||none|
|rtpPacketsReceived|integer(int64)|false|none||none|
|rtpPacketsSent|integer(int64)|false|none||none|
|rtpPacketsLost|integer(int64)|false|none||none|
|rtpPacketsInError|integer(int64)|false|none||none|
|rtpPacketsJitter|number(float64)|false|none||none|
|rtcpPacketsReceived|integer(int64)|false|none||none|
|rtcpPacketsSent|integer(int64)|false|none||none|
|rtcpPacketsInError|integer(int64)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|state|idle|
|state|read|
|state|publish|

<h2 id="tocS_RTSPSessionList">RTSPSessionList</h2>

<a id="schemartspsessionlist"></a>
<a id="schema_RTSPSessionList"></a>
<a id="tocSrtspsessionlist"></a>
<a id="tocsrtspsessionlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "transport": "string",
      "bytesReceived": 0,
      "bytesSent": 0,
      "rtpPacketsReceived": 0,
      "rtpPacketsSent": 0,
      "rtpPacketsLost": 0,
      "rtpPacketsInError": 0,
      "rtpPacketsJitter": 0,
      "rtcpPacketsReceived": 0,
      "rtcpPacketsSent": 0,
      "rtcpPacketsInError": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[RTSPSession](#schemartspsession)]|false|none||none|

<h2 id="tocS_SRTConn">SRTConn</h2>

<a id="schemasrtconn"></a>
<a id="schema_SRTConn"></a>
<a id="tocSsrtconn"></a>
<a id="tocssrtconn"></a>

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "state": "idle",
  "path": "string",
  "query": "string",
  "packetsSent": 0,
  "packetsReceived": 0,
  "packetsReceivedBelated": 0,
  "packetsSentUnique": 0,
  "packetsReceivedUnique": 0,
  "packetsSendLoss": 0,
  "packetsReceivedLoss": 0,
  "packetsRetrans": 0,
  "packetsReceivedRetrans": 0,
  "packetsSentACK": 0,
  "packetsReceivedACK": 0,
  "packetsSentNAK": 0,
  "packetsReceivedNAK": 0,
  "packetsSentKM": 0,
  "packetsReceivedKM": 0,
  "usSndDuration": 0,
  "packetsSendDrop": 0,
  "packetsReceivedDrop": 0,
  "packetsReceivedUndecrypt": 0,
  "bytesSent": 0,
  "bytesReceived": 0,
  "bytesReceivedBelated": 0,
  "bytesSentUnique": 0,
  "bytesReceivedUnique": 0,
  "bytesReceivedLoss": 0,
  "bytesRetrans": 0,
  "bytesReceivedRetrans": 0,
  "bytesSendDrop": 0,
  "bytesReceivedDrop": 0,
  "bytesReceivedUndecrypt": 0,
  "usPacketsSendPeriod": 0,
  "packetsFlowWindow": 0,
  "packetsFlightSize": 0,
  "msRTT": 0,
  "mbpsSendRate": 0,
  "mbpsReceiveRate": 0,
  "mbpsLinkCapacity": 0,
  "bytesAvailSendBuf": 0,
  "bytesAvailReceiveBuf": 0,
  "mbpsMaxBW": 0,
  "byteMSS": 0,
  "packetsSendBuf": 0,
  "bytesSendBuf": 0,
  "msSendBuf": 0,
  "msSendTsbPdDelay": 0,
  "packetsReceiveBuf": 0,
  "bytesReceiveBuf": 0,
  "msReceiveBuf": 0,
  "msReceiveTsbPdDelay": 0,
  "packetsReorderTolerance": 0,
  "packetsReceivedAvgBelatedTime": 0,
  "packetsSendLossRate": 0,
  "packetsReceivedLossRate": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|created|string|false|none||none|
|remoteAddr|string|false|none||none|
|state|string|false|none||none|
|path|string|false|none||none|
|query|string|false|none||none|
|packetsSent|integer(int64)|false|none||The total number of sent DATA packets, including retransmitted packets|
|packetsReceived|integer(int64)|false|none||The total number of received DATA packets, including retransmitted packets|
|packetsReceivedBelated|integer(int64)|false|none||none|
|packetsSentUnique|integer(int64)|false|none||The total number of unique DATA packets sent by the SRT sender|
|packetsReceivedUnique|integer(int64)|false|none||The total number of unique original, retransmitted or recovered by the packet filter DATA packets received in time, decrypted without errors and, as a result, scheduled for delivery to the upstream application by the SRT receiver.|
|packetsSendLoss|integer(int64)|false|none||The total number of data packets considered or reported as lost at the sender side. Does not correspond to the packets detected as lost at the receiver side.|
|packetsReceivedLoss|integer(int64)|false|none||The total number of SRT DATA packets detected as presently missing (either reordered or lost) at the receiver side|
|packetsRetrans|integer(int64)|false|none||The total number of retransmitted packets sent by the SRT sender|
|packetsReceivedRetrans|integer(int64)|false|none||The total number of retransmitted packets registered at the receiver side|
|packetsSentACK|integer(int64)|false|none||The total number of sent ACK (Acknowledgement) control packets|
|packetsReceivedACK|integer(int64)|false|none||The total number of received ACK (Acknowledgement) control packets|
|packetsSentNAK|integer(int64)|false|none||The total number of sent NAK (Negative Acknowledgement) control packets|
|packetsReceivedNAK|integer(int64)|false|none||The total number of received NAK (Negative Acknowledgement) control packets|
|packetsSentKM|integer(int64)|false|none||The total number of sent KM (Key Material) control packets|
|packetsReceivedKM|integer(int64)|false|none||The total number of received KM (Key Material) control packets|
|usSndDuration|integer(int64)|false|none||The total accumulated time in microseconds, during which the SRT sender has some data to transmit, including packets that have been sent, but not yet acknowledged|
|packetsSendDrop|integer(int64)|false|none||The total number of dropped by the SRT sender DATA packets that have no chance to be delivered in time|
|packetsReceivedDrop|integer(int64)|false|none||The total number of dropped by the SRT receiver and, as a result, not delivered to the upstream application DATA packets|
|packetsReceivedUndecrypt|integer(int64)|false|none||The total number of packets that failed to be decrypted at the receiver side|
|bytesSent|integer(int64)|false|none||Same as packetsSent, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceived|integer(int64)|false|none||Same as packetsReceived, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedBelated|integer(int64)|false|none||none|
|bytesSentUnique|integer(int64)|false|none||Same as packetsSentUnique, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedUnique|integer(int64)|false|none||Same as packetsReceivedUnique, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedLoss|integer(int64)|false|none||Same as packetsReceivedLoss, but expressed in bytes, including payload and all the headers (IP, TCP, SRT), bytes for the presently missing (either reordered or lost) packets' payloads are estimated based on the average packet size|
|bytesRetrans|integer(int64)|false|none||Same as packetsRetrans, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedRetrans|integer(int64)|false|none||Same as packetsReceivedRetrans, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesSendDrop|integer(int64)|false|none||Same as packetsSendDrop, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedDrop|integer(int64)|false|none||Same as packetsReceivedDrop, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|bytesReceivedUndecrypt|integer(int64)|false|none||Same as packetsReceivedUndecrypt, but expressed in bytes, including payload and all the headers (IP, TCP, SRT)|
|usPacketsSendPeriod|number(float64)|false|none||Current minimum time interval between which consecutive packets are sent, in microseconds|
|packetsFlowWindow|integer(int64)|false|none||The maximum number of packets that can be "in flight"|
|packetsFlightSize|integer(int64)|false|none||The number of packets in flight|
|msRTT|number(float64)|false|none||Smoothed round-trip time (SRTT), an exponentially-weighted moving average (EWMA) of an endpoint's RTT samples, in milliseconds|
|mbpsSendRate|number(float64)|false|none||Current transmission bandwidth, in Mbps|
|mbpsReceiveRate|number(float64)|false|none||Current receiving bandwidth, in Mbps|
|mbpsLinkCapacity|number(float64)|false|none||Estimated capacity of the network link, in Mbps|
|bytesAvailSendBuf|integer(int64)|false|none||The available space in the sender's buffer, in bytes|
|bytesAvailReceiveBuf|integer(int64)|false|none||The available space in the receiver's buffer, in bytes|
|mbpsMaxBW|number(float64)|false|none||Transmission bandwidth limit, in Mbps|
|byteMSS|integer(int64)|false|none||Maximum Segment Size (MSS), in bytes|
|packetsSendBuf|integer(int64)|false|none||The number of packets in the sender's buffer that are already scheduled for sending or even possibly sent, but not yet acknowledged|
|bytesSendBuf|integer(int64)|false|none||Instantaneous (current) value of packetsSndBuf, but expressed in bytes, including payload and all headers (IP, TCP, SRT)|
|msSendBuf|integer(int64)|false|none||The timespan (msec) of packets in the sender's buffer (unacknowledged packets)|
|msSendTsbPdDelay|integer(int64)|false|none||Timestamp-based Packet Delivery Delay value of the peer|
|packetsReceiveBuf|integer(int64)|false|none||The number of acknowledged packets in receiver's buffer|
|bytesReceiveBuf|integer(int64)|false|none||Instantaneous (current) value of packetsRcvBuf, expressed in bytes, including payload and all headers (IP, TCP, SRT)|
|msReceiveBuf|integer(int64)|false|none||The timespan (msec) of acknowledged packets in the receiver's buffer|
|msReceiveTsbPdDelay|integer(int64)|false|none||Timestamp-based Packet Delivery Delay value set on the socket via SRTO_RCVLATENCY or SRTO_LATENCY|
|packetsReorderTolerance|integer(int64)|false|none||Instant value of the packet reorder tolerance|
|packetsReceivedAvgBelatedTime|integer(int64)|false|none||Accumulated difference between the current time and the time-to-play of a packet that is received late|
|packetsSendLossRate|number(float64)|false|none||Percentage of resent data vs. sent data|
|packetsReceivedLossRate|number(float64)|false|none||Percentage of retransmitted data vs. received data|

#### 枚举值

|属性|值|
|---|---|
|state|idle|
|state|read|
|state|publish|

<h2 id="tocS_SRTConnList">SRTConnList</h2>

<a id="schemasrtconnlist"></a>
<a id="schema_SRTConnList"></a>
<a id="tocSsrtconnlist"></a>
<a id="tocssrtconnlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "state": "idle",
      "path": "string",
      "query": "string",
      "packetsSent": 0,
      "packetsReceived": 0,
      "packetsReceivedBelated": 0,
      "packetsSentUnique": 0,
      "packetsReceivedUnique": 0,
      "packetsSendLoss": 0,
      "packetsReceivedLoss": 0,
      "packetsRetrans": 0,
      "packetsReceivedRetrans": 0,
      "packetsSentACK": 0,
      "packetsReceivedACK": 0,
      "packetsSentNAK": 0,
      "packetsReceivedNAK": 0,
      "packetsSentKM": 0,
      "packetsReceivedKM": 0,
      "usSndDuration": 0,
      "packetsSendDrop": 0,
      "packetsReceivedDrop": 0,
      "packetsReceivedUndecrypt": 0,
      "bytesSent": 0,
      "bytesReceived": 0,
      "bytesReceivedBelated": 0,
      "bytesSentUnique": 0,
      "bytesReceivedUnique": 0,
      "bytesReceivedLoss": 0,
      "bytesRetrans": 0,
      "bytesReceivedRetrans": 0,
      "bytesSendDrop": 0,
      "bytesReceivedDrop": 0,
      "bytesReceivedUndecrypt": 0,
      "usPacketsSendPeriod": 0,
      "packetsFlowWindow": 0,
      "packetsFlightSize": 0,
      "msRTT": 0,
      "mbpsSendRate": 0,
      "mbpsReceiveRate": 0,
      "mbpsLinkCapacity": 0,
      "bytesAvailSendBuf": 0,
      "bytesAvailReceiveBuf": 0,
      "mbpsMaxBW": 0,
      "byteMSS": 0,
      "packetsSendBuf": 0,
      "bytesSendBuf": 0,
      "msSendBuf": 0,
      "msSendTsbPdDelay": 0,
      "packetsReceiveBuf": 0,
      "bytesReceiveBuf": 0,
      "msReceiveBuf": 0,
      "msReceiveTsbPdDelay": 0,
      "packetsReorderTolerance": 0,
      "packetsReceivedAvgBelatedTime": 0,
      "packetsSendLossRate": 0,
      "packetsReceivedLossRate": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[SRTConn](#schemasrtconn)]|false|none||none|

<h2 id="tocS_WebRTCSession">WebRTCSession</h2>

<a id="schemawebrtcsession"></a>
<a id="schema_WebRTCSession"></a>
<a id="tocSwebrtcsession"></a>
<a id="tocswebrtcsession"></a>

```json
{
  "id": "string",
  "created": "string",
  "remoteAddr": "string",
  "peerConnectionEstablished": true,
  "localCandidate": "string",
  "remoteCandidate": "string",
  "state": "read",
  "path": "string",
  "query": "string",
  "bytesReceived": 0,
  "bytesSent": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|created|string|false|none||none|
|remoteAddr|string|false|none||none|
|peerConnectionEstablished|boolean|false|none||none|
|localCandidate|string|false|none||none|
|remoteCandidate|string|false|none||none|
|state|string|false|none||none|
|path|string|false|none||none|
|query|string|false|none||none|
|bytesReceived|integer(int64)|false|none||none|
|bytesSent|integer(int64)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|state|read|
|state|publish|

<h2 id="tocS_WebRTCSessionList">WebRTCSessionList</h2>

<a id="schemawebrtcsessionlist"></a>
<a id="schema_WebRTCSessionList"></a>
<a id="tocSwebrtcsessionlist"></a>
<a id="tocswebrtcsessionlist"></a>

```json
{
  "pageCount": 0,
  "itemCount": 0,
  "items": [
    {
      "id": "string",
      "created": "string",
      "remoteAddr": "string",
      "peerConnectionEstablished": true,
      "localCandidate": "string",
      "remoteCandidate": "string",
      "state": "read",
      "path": "string",
      "query": "string",
      "bytesReceived": 0,
      "bytesSent": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|pageCount|integer|false|none||none|
|itemCount|integer|false|none||none|
|items|[[WebRTCSession](#schemawebrtcsession)]|false|none||none|

