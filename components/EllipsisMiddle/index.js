import { Typography } from "antd";

const { Text } = Typography;

export function EllipsisMiddle({ suffixCount, style, ellipsis, children, ...props }) {
  const start = children.slice(0, children.length - suffixCount).trim();
  // const suffix = children.slice(-suffixCount).trim();
  return (
    <Text
      style={{
        maxWidth: '100%',
        ...style
      }}
      ellipsis={{
        suffix: '...',
        ...ellipsis
      }}
      title={children}
      {...props}
    >
      {start}
    </Text>
  )
}

export default EllipsisMiddle