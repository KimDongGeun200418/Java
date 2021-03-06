"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_1 = require("@tensorflow/tfjs");
var nodejs_kernel_backend_1 = require("../nodejs_kernel_backend");
tfjs_1.registerKernel({
    kernelName: 'Softmax',
    backendName: 'tensorflow',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var logits = inputs.logits;
        var opAttrs = [nodejs_kernel_backend_1.createTypeOpAttr('T', logits.dtype)];
        var nodeBackend = backend;
        return nodeBackend.executeSingleOutput('Softmax', opAttrs, [logits]);
    }
});
