// import * as tf from '@tensorflow/tfjs';
 
// const model = await tf.loadModel('file://C:/Users/syslab/Desktop/tensorflowSave/model/tfjs_target_dir/model.json');

myRunFunction = function(){
    rTfFunc()
}

async function rTfFunc(){
    const tf = require("@tensorflow/tfjs-node")
    const model = await tf.loadLayersModel('model.json')
    console.log(model)
}

myRunFunction()
