"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Типы изображений */
var ImageType;
(function (ImageType) {
    ImageType[ImageType["REGULAR"] = 0] = "REGULAR";
    ImageType[ImageType["SNAP"] = 1] = "SNAP";
    ImageType[ImageType["STICKER"] = 2] = "STICKER";
    ImageType[ImageType["RESERVED_3"] = 3] = "RESERVED_3";
    ImageType[ImageType["IMAGE_ANIMATED"] = 4] = "IMAGE_ANIMATED";
    ImageType[ImageType["STICKER_ANIMATED"] = 5] = "STICKER_ANIMATED";
    ImageType[ImageType["RESERVED_6"] = 6] = "RESERVED_6";
    ImageType[ImageType["RESERVED_7"] = 7] = "RESERVED_7";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
/** Типы видео */
var VideoType;
(function (VideoType) {
    VideoType["REGULAR"] = "8";
    VideoType["SNAP"] = "9";
    VideoType["PTS"] = "A";
    VideoType["PTS_B"] = "B";
    VideoType["RESERVED_C"] = "C";
    VideoType["STICKER"] = "D";
    VideoType["RESERVED_E"] = "E";
    VideoType["RESERVED_F"] = "F";
})(VideoType = exports.VideoType || (exports.VideoType = {}));
/** Типы аудио */
var AudioType;
(function (AudioType) {
    AudioType["REGULAR"] = "G";
    AudioType["SNAP"] = "H";
    AudioType["PTT"] = "I";
    AudioType["PTT_J"] = "J";
    AudioType["RESERVED_K"] = "K";
    AudioType["RESERVED_L"] = "L";
    AudioType["RESERVED_M"] = "M";
    AudioType["RESERVED_N"] = "N";
})(AudioType = exports.AudioType || (exports.AudioType = {}));
//# sourceMappingURL=constant.js.map