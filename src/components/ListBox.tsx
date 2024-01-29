import React from 'react'

interface ListItem {
  id: number
  name: string
}

interface ListBoxProps {
  items: ListItem[]
  activeIndex: any
}

const ListBox: React.FC<ListBoxProps> = ({ items, activeIndex }) => {
  return (
      <ul data-testid="listBox" className="listBoxContainer">
        {items.map((item, index) => (
          <li
            className={`listBoxItem ${index === activeIndex ? 'active' : ''}`}
            key={item.id}
          >
            {item.name}
          </li>
        ))}
      </ul>
  )
}

export default ListBox
