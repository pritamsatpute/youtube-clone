// Format Views
export default function formatViews(views = 0) {
  if (views >= 1000000000) {
    return `${(views / 1000000000).toFixed(1)}B views`;
  }

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }

  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }

  return `${views} views`;
}