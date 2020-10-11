export function range(value, min, max)
{
    value = Math.max(value - min, 0);

    return Math.min(value / (max - min), 1);
}