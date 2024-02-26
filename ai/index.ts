async function predictUsingModel(model: tf.Sequential, testData: number[][], sequenceLength: number): Promise<number[]> {
    // 对新的测试数据进行预处理，将其转化为符合模型输入格式的二维张量
    const testDataTensors = tf.tensor2d(testData);

    // 将单个数据点扩展为序列数据
    const paddedTestData = tf.pad(testDataTensors, [[0, 0], [0, sequenceLength - 1]]);
    const slidingWindows = tf.tensor2d(Array.from({ length: testData.length - sequenceLength + 1 }, (_, i) => paddedTestData.slice([i, 0], [1, sequenceLength]).arraySync()));

    // 使用模型进行预测
    const predictions = model.predict(slidingWindows) as tf.Tensor;

    // 获取预测结果并向量化
    const predictedProbabilities = predictions.arraySync();

    // 对于二分类问题，可以根据概率阈值（例如0.5）决定是否为拐点
    const predictedLabels = predictedProbabilities.map(prob => prob > 0.5 ? 1 : 0);

    return predictedLabels;
}

// 假设你有一段新的传感器数据
const newData: number[][] = [...]; // 新的传感器数据，每个元素是一个时间步的数据点

// 使用训练好的模型进行预测
const predictedPoints = await predictUsingModel(model, newData, sequenceLength);

console.log('Predicted points:', predictedPoints);