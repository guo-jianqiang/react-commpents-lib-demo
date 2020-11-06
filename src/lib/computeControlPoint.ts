export default function computeControlPoint(ps: [number, number], pe: [number, number], arc = 0.5) {
    const deltaX = pe[0] - ps[0];
    const deltaY = pe[1] - ps[1];
    const theta = Math.atan(deltaY / deltaX);
    const len = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) / 2 * arc;
    const newTheta = theta - Math.PI / 2;
    return [
        (ps[0] + pe[0]) / 2 + len * Math.cos(newTheta),
        (ps[1] + pe[1]) / 2 + len * Math.sin(newTheta),
    ];
}
