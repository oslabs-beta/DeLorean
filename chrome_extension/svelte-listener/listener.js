const listenerList = []
export function addNodeListener(listener) {
  listenerList.push(listener)
}

export function removeNodeListener(listener) {
  const index = listenerList.indexOf(listener)
  if (index == -1) return false

  listenerList.splice(index, 1)
  return true
}

export function add(node, anchorNode) {
  for (const listener of listenerList) listener.add(node, anchorNode)
}

export function update(node) {
  if (!node) return

  for (const listener of listenerList) listener.update(node)
}

export function remove(node) {
  for (const listener of listenerList) listener.remove(node)
}

export function profile(frame) {
  for (const listener of listenerList) listener.profile(frame)
}
