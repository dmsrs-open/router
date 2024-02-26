// TypeScript 接口定义
export interface SensorData {
    time: Date; // 假设时间是日期类型
    x: number;
    originalWeight: number; // 原始重量
    stableWeight: number; // 稳定重量
    axleLoad: number; // 轴重
    suAd: number; // su_ad 字段（具体含义未知，根据实际业务补充）
    wpuX: number; // wpu_x 字段
    wpuY: number; // wpu_y 字段
    wpuZ: number; // wpu_z 字段
    suX: number; // su_x 字段
    suY: number; // su_y 字段
    suZ: number; // su_z 字段
    originalWeightDiff: number; // 原始重量变化值
    stableWeightDiff: number; // 稳定重量变化值
    axleLoadDiff: number; // 轴重变化值
    suAdDiff: number; // su_ad 的变化值
    wpuXdDiff: number; // wpu_x 的变化值
    wpuYDiff: number; // wpu_y 的变化值
    wpuZDiff: number; // wpu_z 的变化值
    suXdDiff: number; // su_x 的变化值
    suYDiff: number; // su_y 的变化值
    suZDiff: number; // su_z 的变化值
    trajectoryTime: Date; // 轨迹时间（如果与上述“时间”不同，则此假设为日期类型）
    speed: number; // 速度
    estimatedWeight: number; // 估计重量
    originalWeightAcceleration: number; // 原始重量加速度
    stableWeightAcceleration: number; // 稳定重量加速度
    originalWeightAccelerationSecondOrder: number; // 原始重量加速度_二阶
    stableWeightAccelerationSecondOrder: number; // 稳定重量加速度_二阶
}
type ProcessedData = {
    featureValues: number[];
    labelValue: number; // 假设这里是一个二进制标签，0代表非拐点，1代表拐点
};
// 如果以上某些字段含义不明，请按实际情况调整数据类型和注释说明