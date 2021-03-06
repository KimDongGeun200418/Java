"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_1 = require("@tensorflow/tfjs");
var nodejs_kernel_backend_1 = require("./nodejs_kernel_backend");
var ImageType;
(function (ImageType) {
    ImageType["JPEG"] = "jpeg";
    ImageType["PNG"] = "png";
    ImageType["GIF"] = "gif";
    ImageType["BMP"] = "BMP";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
/**
 * Decode a JPEG-encoded image to a 3D Tensor of dtype `int32`.
 *
 * @param contents The JPEG-encoded image in an Uint8Array.
 * @param channels An optional int. Defaults to 0. Accepted values are
 *     0: use the number of channels in the JPEG-encoded image.
 *     1: output a grayscale image.
 *     3: output an RGB image.
 * @param ratio An optional int. Defaults to 1. Downscaling ratio. It is used
 *     when image is type Jpeg.
 * @param fancyUpscaling An optional bool. Defaults to True. If true use a
 *     slower but nicer upscaling of the chroma planes. It is used when image is
 *     type Jpeg.
 * @param tryRecoverTruncated An optional bool. Defaults to False. If true try
 *     to recover an image from truncated input. It is used when image is type
 *     Jpeg.
 * @param acceptableFraction An optional float. Defaults to 1. The minimum
 *     required fraction of lines before a truncated input is accepted. It is
 *     used when image is type Jpeg.
 * @param dctMethod An optional string. Defaults to "". string specifying a hint
 *     about the algorithm used for decompression. Defaults to "" which maps to
 *     a system-specific default. Currently valid values are ["INTEGER_FAST",
 *     "INTEGER_ACCURATE"]. The hint may be ignored (e.g., the internal jpeg
 *     library changes to a version that does not have that specific option.) It
 *     is used when image is type Jpeg.
 * @returns A 3D Tensor of dtype `int32` with shape [height, width, 1/3].
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function decodeJpeg(contents, channels, ratio, fancyUpscaling, tryRecoverTruncated, acceptableFraction, dctMethod) {
    if (channels === void 0) { channels = 0; }
    if (ratio === void 0) { ratio = 1; }
    if (fancyUpscaling === void 0) { fancyUpscaling = true; }
    if (tryRecoverTruncated === void 0) { tryRecoverTruncated = false; }
    if (acceptableFraction === void 0) { acceptableFraction = 1; }
    if (dctMethod === void 0) { dctMethod = ''; }
    nodejs_kernel_backend_1.ensureTensorflowBackend();
    return tfjs_1.tidy(function () {
        return nodejs_kernel_backend_1.nodeBackend()
            .decodeJpeg(contents, channels, ratio, fancyUpscaling, tryRecoverTruncated, acceptableFraction, dctMethod)
            .toInt();
    });
}
exports.decodeJpeg = decodeJpeg;
/**
 * Decode a PNG-encoded image to a 3D Tensor of dtype `int32`.
 *
 * @param contents The PNG-encoded image in an Uint8Array.
 * @param channels An optional int. Defaults to 0. Accepted values are
 *      0: use the number of channels in the PNG-encoded image.
 *      1: output a grayscale image.
 *      3: output an RGB image.
 *      4: output an RGBA image.
 * @param dtype The data type of the result. Only `int32` is supported at this
 *     time.
 * @returns A 3D Tensor of dtype `int32` with shape [height, width, 1/3/4].
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function decodePng(contents, channels, dtype) {
    if (channels === void 0) { channels = 0; }
    if (dtype === void 0) { dtype = 'int32'; }
    tfjs_1.util.assert(dtype === 'int32', function () { return 'decodeImage could only return Tensor of type `int32` for now.'; });
    nodejs_kernel_backend_1.ensureTensorflowBackend();
    return tfjs_1.tidy(function () {
        return nodejs_kernel_backend_1.nodeBackend().decodePng(contents, channels).toInt();
    });
}
exports.decodePng = decodePng;
/**
 * Decode the first frame of a BMP-encoded image to a 3D Tensor of dtype
 * `int32`.
 *
 * @param contents The BMP-encoded image in an Uint8Array.
 * @param channels An optional int. Defaults to 0. Accepted values are
 *      0: use the number of channels in the BMP-encoded image.
 *      3: output an RGB image.
 *      4: output an RGBA image.
 * @returns A 3D Tensor of dtype `int32` with shape [height, width, 3/4].
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function decodeBmp(contents, channels) {
    if (channels === void 0) { channels = 0; }
    nodejs_kernel_backend_1.ensureTensorflowBackend();
    return tfjs_1.tidy(function () {
        return nodejs_kernel_backend_1.nodeBackend().decodeBmp(contents, channels).toInt();
    });
}
exports.decodeBmp = decodeBmp;
/**
 * Decode the frame(s) of a GIF-encoded image to a 4D Tensor of dtype `int32`.
 *
 * @param contents The GIF-encoded image in an Uint8Array.
 * @returns A 4D Tensor of dtype `int32` with shape [num_frames, height, width,
 *     3]. RGB channel order.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function decodeGif(contents) {
    nodejs_kernel_backend_1.ensureTensorflowBackend();
    return tfjs_1.tidy(function () {
        return nodejs_kernel_backend_1.nodeBackend().decodeGif(contents).toInt();
    });
}
exports.decodeGif = decodeGif;
/**
 * Given the encoded bytes of an image, it returns a 3D or 4D tensor of the
 * decoded image. Supports BMP, GIF, JPEG and PNG formats.
 *
 * @param content The encoded image in an Uint8Array.
 * @param channels An optional int. Defaults to 0, use the number of channels in
 *     the image. Number of color channels for the decoded image. It is used
 *     when image is type Png, Bmp, or Jpeg.
 * @param dtype The data type of the result. Only `int32` is supported at this
 *     time.
 * @param expandAnimations A boolean which controls the shape of the returned
 *     op's output. If True, the returned op will produce a 3-D tensor for PNG,
 *     JPEG, and BMP files; and a 4-D tensor for all GIFs, whether animated or
 *     not. If, False, the returned op will produce a 3-D tensor for all file
 *     types and will truncate animated GIFs to the first frame.
 * @returns A Tensor with dtype `int32` and a 3- or 4-dimensional shape,
 *     depending on the file type. For gif file the returned Tensor shape is
 *     [num_frames, height, width, 3], and for jpeg/png/bmp the returned Tensor
 *     shape is [height, width, channels]
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function decodeImage(content, channels, dtype, expandAnimations) {
    if (channels === void 0) { channels = 0; }
    if (dtype === void 0) { dtype = 'int32'; }
    if (expandAnimations === void 0) { expandAnimations = true; }
    tfjs_1.util.assert(dtype === 'int32', function () { return 'decodeImage could only return Tensor of type `int32` for now.'; });
    var imageType = getImageType(content);
    // The return tensor has dtype uint8, which is not supported in
    // TensorFlow.js, casting it to int32 which is the default dtype for image
    // tensor. If the image is BMP, JPEG or PNG type, expanding the tensors
    // shape so it becomes Tensor4D, which is the default tensor shape for image
    // ([batch,imageHeight,imageWidth, depth]).
    switch (imageType) {
        case ImageType.JPEG:
            return decodeJpeg(content, channels);
        case ImageType.PNG:
            return decodePng(content, channels);
        case ImageType.GIF:
            // If not to expand animations, take first frame of the gif and return
            // as a 3D tensor.
            return tfjs_1.tidy(function () {
                var img = decodeGif(content);
                return expandAnimations ? img : img.slice(0, 1).squeeze([0]);
            });
        case ImageType.BMP:
            return decodeBmp(content, channels);
        default:
            return null;
    }
}
exports.decodeImage = decodeImage;
/**
 * Encodes an image tensor to JPEG.
 *
 * @param image A 3-D uint8 Tensor of shape [height, width, channels].
 * @param format An optional string from: "", "grayscale", "rgb".
 *     Defaults to "". Per pixel image format.
 *     - '': Use a default format based on the number of channels in the image.
 *     - grayscale: Output a grayscale JPEG image. The channels dimension of
 *       image must be 1.
 *     - rgb: Output an RGB JPEG image. The channels dimension of image must
 *       be 3.
 * @param quality An optional int. Defaults to 95. Quality of the compression
 *     from 0 to 100 (higher is better and slower).
 * @param progressive An optional bool. Defaults to False. If True, create a
 *     JPEG that loads progressively (coarse to fine).
 * @param optimizeSize An optional bool. Defaults to False. If True, spend
 *     CPU/RAM to reduce size with no quality change.
 * @param chromaDownsampling  An optional bool. Defaults to True.
 *     See http://en.wikipedia.org/wiki/Chroma_subsampling.
 * @param densityUnit An optional string from: "in", "cm". Defaults to "in".
 *     Unit used to specify x_density and y_density: pixels per inch ('in') or
 *     centimeter ('cm').
 * @param xDensity An optional int. Defaults to 300. Horizontal pixels per
 *     density unit.
 * @param yDensity An optional int. Defaults to 300. Vertical pixels per
 *     density unit.
 * @param xmpMetadata An optional string. Defaults to "". If not empty, embed
 *     this XMP metadata in the image header.
 * @returns The JPEG encoded data as an Uint8Array.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function encodeJpeg(image, format, quality, progressive, optimizeSize, chromaDownsampling, densityUnit, xDensity, yDensity, xmpMetadata) {
    if (format === void 0) { format = ''; }
    if (quality === void 0) { quality = 95; }
    if (progressive === void 0) { progressive = false; }
    if (optimizeSize === void 0) { optimizeSize = false; }
    if (chromaDownsampling === void 0) { chromaDownsampling = true; }
    if (densityUnit === void 0) { densityUnit = 'in'; }
    if (xDensity === void 0) { xDensity = 300; }
    if (yDensity === void 0) { yDensity = 300; }
    if (xmpMetadata === void 0) { xmpMetadata = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var backendEncodeImage;
        return __generator(this, function (_a) {
            nodejs_kernel_backend_1.ensureTensorflowBackend();
            backendEncodeImage = function (imageData) {
                return nodejs_kernel_backend_1.nodeBackend().encodeJpeg(imageData, image.shape, format, quality, progressive, optimizeSize, chromaDownsampling, densityUnit, xDensity, yDensity, xmpMetadata);
            };
            return [2 /*return*/, encodeImage(image, backendEncodeImage)];
        });
    });
}
exports.encodeJpeg = encodeJpeg;
/**
 * Encodes an image tensor to PNG.
 *
 * @param image A 3-D uint8 Tensor of shape [height, width, channels].
 * @param compression An optional int. Defaults to -1. Compression level.
 * @returns The PNG encoded data as an Uint8Array.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Images', namespace: 'node'}
 */
function encodePng(image, compression) {
    if (compression === void 0) { compression = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var backendEncodeImage;
        return __generator(this, function (_a) {
            nodejs_kernel_backend_1.ensureTensorflowBackend();
            backendEncodeImage = function (imageData) {
                return nodejs_kernel_backend_1.nodeBackend().encodePng(imageData, image.shape, compression);
            };
            return [2 /*return*/, encodeImage(image, backendEncodeImage)];
        });
    });
}
exports.encodePng = encodePng;
function encodeImage(image, backendEncodeImage) {
    return __awaiter(this, void 0, void 0, function () {
        var encodedDataTensor, _a, _b, encodedPngData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = backendEncodeImage;
                    _b = Uint8Array.bind;
                    return [4 /*yield*/, image.data()];
                case 1:
                    encodedDataTensor = _a.apply(void 0, [new (_b.apply(Uint8Array, [void 0, _c.sent()]))()]);
                    // tslint:disable-next-line:no-any
                    return [4 /*yield*/, encodedDataTensor.data()];
                case 2:
                    encodedPngData = (
                    // tslint:disable-next-line:no-any
                    _c.sent())[0];
                    encodedDataTensor.dispose();
                    return [2 /*return*/, encodedPngData];
            }
        });
    });
}
/**
 * Helper function to get image type based on starting bytes of the image file.
 */
function getImageType(content) {
    // Classify the contents of a file based on starting bytes (aka magic number:
    // https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files)
    // This aligns with TensorFlow Core code:
    // https://github.com/tensorflow/tensorflow/blob/4213d5c1bd921f8d5b7b2dc4bbf1eea78d0b5258/tensorflow/core/kernels/decode_image_op.cc#L44
    if (content.length > 3 && content[0] === 255 && content[1] === 216 &&
        content[2] === 255) {
        // JPEG byte chunk starts with `ff d8 ff`
        return ImageType.JPEG;
    }
    else if (content.length > 4 && content[0] === 71 && content[1] === 73 &&
        content[2] === 70 && content[3] === 56) {
        // GIF byte chunk starts with `47 49 46 38`
        return ImageType.GIF;
    }
    else if (content.length > 8 && content[0] === 137 && content[1] === 80 &&
        content[2] === 78 && content[3] === 71 && content[4] === 13 &&
        content[5] === 10 && content[6] === 26 && content[7] === 10) {
        // PNG byte chunk starts with `\211 P N G \r \n \032 \n (89 50 4E 47 0D 0A
        // 1A 0A)`
        return ImageType.PNG;
    }
    else if (content.length > 3 && content[0] === 66 && content[1] === 77) {
        // BMP byte chunk starts with `42 4d`
        return ImageType.BMP;
    }
    else {
        throw new Error('Expected image (BMP, JPEG, PNG, or GIF), but got unsupported ' +
            'image type');
    }
}
exports.getImageType = getImageType;
