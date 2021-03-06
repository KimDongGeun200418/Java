"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var path = require("path");
var callbacks_1 = require("./callbacks");
var file_system_1 = require("./io/file_system");
var nodeIo = require("./io/index");
var nodejs_kernel_backend_1 = require("./nodejs_kernel_backend");
var nodeVersion = require("./version");
// Import all kernels.
require("./kernels/all_kernels");
// tslint:disable-next-line:no-require-imports
var binary = require('node-pre-gyp');
var bindingPath = binary.find(path.resolve(path.join(__dirname, '/../package.json')));
// Check if the node native addon module exists.
// tslint:disable-next-line:no-require-imports
var fs = require('fs');
if (!fs.existsSync(bindingPath)) {
    throw new Error("The Node.js native addon module (tfjs_binding.node) can not "
        + "be found at path: " + String(bindingPath)
        + ". \nPlease run command "
        + "'npm rebuild @tensorflow/tfjs-node build-addon-from-source' to rebuild "
        + "the native addon module. \nIf you have problem with building the addon "
        + "module, please check https://github.com/tensorflow/tfjs/blob/master"
        + "/tfjs-node/WINDOWS_TROUBLESHOOTING.md or file an issue.");
}
// tslint:disable-next-line:no-require-imports
var bindings = require(bindingPath);
// Merge version and io namespaces.
exports.version = __assign({}, tf.version, { 'tfjs-node': nodeVersion.version });
exports.io = __assign({}, tf.io, nodeIo);
// Export all union package symbols
__export(require("@tensorflow/tfjs"));
__export(require("./node"));
// tslint:disable-next-line:no-require-imports
var pjson = require('../package.json');
tf.registerBackend('tensorflow', function () {
    return new nodejs_kernel_backend_1.NodeJSKernelBackend(bindings, pjson.name);
}, 3 /* priority */);
var success = tf.setBackend('tensorflow');
if (!success) {
    throw new Error("Could not initialize TensorFlow backend.");
}
// Register the model saving and loading handlers for the 'file://' URL scheme.
tf.io.registerLoadRouter(file_system_1.nodeFileSystemRouter);
tf.io.registerSaveRouter(file_system_1.nodeFileSystemRouter);
// Register the ProgbarLogger for Model.fit() at verbosity level 1.
tf.registerCallbackConstructor(1, callbacks_1.ProgbarLogger);
