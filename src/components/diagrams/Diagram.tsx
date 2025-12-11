import React from 'react';
import styles from './Diagram.module.css';

// Color palette
export const colors = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  green: '#10b981',
  orange: '#f59e0b',
  red: '#ef4444',
  slate: '#64748b',
  cyan: '#06b6d4',
  pink: '#ec4899',
};

// ============================================
// Box Component - A single node/box
// ============================================
interface BoxProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'filled' | 'outlined' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

export function Box({
  children,
  color = colors.blue,
  variant = 'filled',
  size = 'md',
  icon
}: BoxProps) {
  const sizeClasses = {
    sm: styles.boxSm,
    md: styles.boxMd,
    lg: styles.boxLg,
  };

  const getStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `2px solid ${color}`,
          color: color,
          background: 'transparent'
        };
      case 'subtle':
        return {
          background: `${color}20`,
          color: color,
          border: `1px solid ${color}40`
        };
      default:
        return {
          background: color,
          color: 'white'
        };
    }
  };

  return (
    <div className={`${styles.box} ${sizeClasses[size]}`} style={getStyles()}>
      {icon && <span className={styles.boxIcon}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

// ============================================
// Arrow Component
// ============================================
interface ArrowProps {
  direction?: 'right' | 'down' | 'left' | 'up';
  label?: string;
  color?: string;
}

export function Arrow({ direction = 'right', label, color = colors.slate }: ArrowProps) {
  const arrows = {
    right: '→',
    down: '↓',
    left: '←',
    up: '↑',
  };

  return (
    <div className={`${styles.arrow} ${styles[`arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`]}`}>
      {label && <span className={styles.arrowLabel} style={{ color }}>{label}</span>}
      <span className={styles.arrowSymbol} style={{ color }}>{arrows[direction]}</span>
    </div>
  );
}

// ============================================
// Row Component - Horizontal layout
// ============================================
interface RowProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

export function Row({ children, gap = 'md', align = 'center', wrap = true }: RowProps) {
  const gapSizes = { sm: '0.5rem', md: '1rem', lg: '1.5rem' };
  return (
    <div
      className={styles.row}
      style={{
        gap: gapSizes[gap],
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap'
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// Column Component - Vertical layout
// ============================================
interface ColumnProps {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}

export function Column({ children, gap = 'md', align = 'center' }: ColumnProps) {
  const gapSizes = { sm: '0.5rem', md: '1rem', lg: '1.5rem' };
  return (
    <div
      className={styles.column}
      style={{ gap: gapSizes[gap], alignItems: align }}
    >
      {children}
    </div>
  );
}

// ============================================
// Group Component - Grouped boxes with title
// ============================================
interface GroupProps {
  title?: string;
  children: React.ReactNode;
  color?: string;
  direction?: 'row' | 'column';
}

export function Group({ title, children, color = colors.slate, direction = 'column' }: GroupProps) {
  return (
    <div className={styles.group} style={{ borderColor: `${color}40` }}>
      {title && (
        <div className={styles.groupTitle} style={{ color }}>
          {title}
        </div>
      )}
      <div className={direction === 'row' ? styles.row : styles.column} style={{ gap: '0.75rem' }}>
        {children}
      </div>
    </div>
  );
}

// ============================================
// DiagramContainer - Wrapper for all diagrams
// ============================================
interface DiagramContainerProps {
  children: React.ReactNode;
  title?: string;
}

export function DiagramContainer({ children, title }: DiagramContainerProps) {
  return (
    <div className={styles.container}>
      {title && <div className={styles.containerTitle}>{title}</div>}
      <div className={styles.containerContent}>
        {children}
      </div>
    </div>
  );
}

// ============================================
// ProcessFlow - Step by step process
// ============================================
interface ProcessStep {
  title?: string;
  label?: string;
  description?: string;
  icon?: string;
  color?: string;
  active?: boolean;
}

interface ProcessFlowProps {
  steps?: ProcessStep[];
  stages?: { label: string; color?: string }[];
  direction?: 'horizontal' | 'vertical';
}

export function ProcessFlow({ steps, stages, direction = 'horizontal' }: ProcessFlowProps) {
  // Support both steps and stages format
  const items = steps || stages?.map(s => ({ title: s.label, color: s.color })) || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.processFlow} ${direction === 'vertical' ? styles.processFlowVertical : ''}`}>
      {items.map((step, index) => (
        <React.Fragment key={index}>
          <div className={styles.processStep}>
            <div
              className={styles.processStepNumber}
              style={{ background: step.color || colors.blue }}
            >
              {step.icon || index + 1}
            </div>
            <div className={styles.processStepContent}>
              <div className={styles.processStepTitle}>{step.title || step.label}</div>
              {step.description && (
                <div className={styles.processStepDesc}>{step.description}</div>
              )}
            </div>
          </div>
          {index < items.length - 1 && (
            <div className={`${styles.processConnector} ${direction === 'vertical' ? styles.processConnectorVertical : ''}`}>
              {direction === 'vertical' ? '↓' : '→'}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================
// TreeDiagram - Hierarchical tree
// ============================================
interface TreeNode {
  label: string;
  color?: string;
  icon?: string;
  children?: TreeNode[];
}

interface TreeDiagramProps {
  root?: TreeNode;
  compact?: boolean;
  children?: React.ReactNode;
}

export function TreeDiagram({ root, compact = false, children }: TreeDiagramProps) {
  // If children are provided, render them in a column layout
  if (children) {
    return (
      <div className={styles.tree}>
        <div className={styles.column} style={{ gap: '0.75rem', alignItems: 'stretch' }}>
          {children}
        </div>
      </div>
    );
  }

  // If no root, return null
  if (!root) {
    return null;
  }

  const renderNode = (node: TreeNode, level: number = 0) => (
    <div className={styles.treeNode} key={node.label}>
      <Box color={node.color || colors.blue} size={compact ? 'sm' : 'md'} icon={node.icon}>
        {node.label}
      </Box>
      {node.children && node.children.length > 0 && (
        <>
          <div className={styles.treeBranch}>↓</div>
          <div className={styles.treeChildren}>
            {node.children.map((child, idx) => (
              <React.Fragment key={idx}>
                {renderNode(child, level + 1)}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={styles.tree}>
      {renderNode(root)}
    </div>
  );
}

// ============================================
// CardGrid - Grid of cards
// ============================================
interface Card {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  items?: string[];
}

interface CardGridProps {
  cards?: Card[];
  columns?: 2 | 3 | 4;
  children?: React.ReactNode;
}

export function CardGrid({ cards, columns = 3, children }: CardGridProps) {
  // If children are provided, render them in a grid
  if (children) {
    return (
      <div
        className={styles.cardGrid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {children}
      </div>
    );
  }

  // If no cards, return null
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.cardGrid}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ borderTopColor: card.color || colors.blue }}
        >
          {card.icon && <div className={styles.cardIcon}>{card.icon}</div>}
          <div className={styles.cardTitle}>{card.title}</div>
          {card.description && (
            <div className={styles.cardDesc}>{card.description}</div>
          )}
          {card.items && (
            <ul className={styles.cardItems}>
              {card.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// ConnectionDiagram - Nodes with connections
// ============================================
interface ConnectionNode {
  id: string;
  label: string;
  color?: string;
  icon?: string;
}

interface Connection {
  from: string;
  to: string;
  label?: string;
}

interface ConnectionDiagramProps {
  nodes: ConnectionNode[];
  connections: Connection[];
  layout?: 'horizontal' | 'vertical' | 'hub';
}

export function ConnectionDiagram({ nodes, connections, layout = 'horizontal' }: ConnectionDiagramProps) {
  if (layout === 'hub' && nodes.length > 1) {
    const center = nodes[0];
    const others = nodes.slice(1);

    return (
      <div className={styles.hubLayout}>
        <div className={styles.hubCenter}>
          <Box color={center.color || colors.blue} size="lg" icon={center.icon}>
            {center.label}
          </Box>
        </div>
        <div className={styles.hubSpokes}>
          {others.map((node, idx) => {
            const conn = connections.find(c => c.from === center.id && c.to === node.id);
            return (
              <div key={idx} className={styles.hubSpoke}>
                <div className={styles.hubConnector}>
                  {conn?.label && <span className={styles.hubConnLabel}>{conn.label}</span>}
                  <span>→</span>
                </div>
                <Box color={node.color || colors.slate} icon={node.icon}>
                  {node.label}
                </Box>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={layout === 'vertical' ? styles.column : styles.row} style={{ gap: '1rem' }}>
      {nodes.map((node, idx) => (
        <React.Fragment key={node.id}>
          <Box color={node.color || colors.blue} icon={node.icon}>
            {node.label}
          </Box>
          {idx < nodes.length - 1 && (
            <Arrow
              direction={layout === 'vertical' ? 'down' : 'right'}
              label={connections.find(c => c.from === node.id)?.label}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================
// StackDiagram - Layered architecture
// ============================================
interface Layer {
  label: string;
  color?: string;
  items?: string[];
}

interface StackDiagramProps {
  layers?: Layer[];
  title?: string;
  children?: React.ReactNode;
}

export function StackDiagram({ layers, title, children }: StackDiagramProps) {
  // If children are provided, render them directly
  if (children) {
    return (
      <div className={styles.stack}>
        {title && <div className={styles.stackTitle}>{title}</div>}
        <div className={styles.column} style={{ gap: '0.5rem', width: '100%' }}>
          {children}
        </div>
      </div>
    );
  }

  // If no layers, return null
  if (!layers || layers.length === 0) {
    return null;
  }

  return (
    <div className={styles.stack}>
      {title && <div className={styles.stackTitle}>{title}</div>}
      {layers.map((layer, index) => (
        <div
          key={index}
          className={styles.stackLayer}
          style={{
            background: `${layer.color || colors.blue}15`,
            borderColor: `${layer.color || colors.blue}40`
          }}
        >
          <div className={styles.stackLayerLabel} style={{ color: layer.color || colors.blue }}>
            {layer.label}
          </div>
          {layer.items && (
            <div className={styles.stackLayerItems}>
              {layer.items.map((item, idx) => (
                <span key={idx} className={styles.stackLayerItem}>{item}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// ComparisonTable - Side by side comparison
// ============================================
interface ComparisonItem {
  label: string;
  before: string;
  after: string;
}

interface ComparisonTableProps {
  items?: ComparisonItem[];
  headers?: string[];
  rows?: string[][];
  beforeTitle?: string;
  afterTitle?: string;
  beforeColor?: string;
  afterColor?: string;
}

export function ComparisonTable({
  items,
  headers,
  rows,
  beforeTitle = 'Before',
  afterTitle = 'After',
  beforeColor = colors.slate,
  afterColor = colors.green
}: ComparisonTableProps) {
  // Support headers/rows format (generic table)
  if (headers && rows) {
    return (
      <div className={styles.comparison} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} style={{
                  padding: '0.75rem',
                  borderBottom: '2px solid var(--ifm-color-emphasis-300)',
                  textAlign: 'left',
                  fontWeight: 600
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid var(--ifm-color-emphasis-200)'
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Original before/after format
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.comparison}>
      <div className={styles.comparisonHeader}>
        <div></div>
        <div style={{ color: beforeColor }}>{beforeTitle}</div>
        <div style={{ color: afterColor }}>{afterTitle}</div>
      </div>
      {items.map((item, index) => (
        <div key={index} className={styles.comparisonRow}>
          <div className={styles.comparisonLabel}>{item.label}</div>
          <div className={styles.comparisonBefore}>{item.before}</div>
          <div className={styles.comparisonAfter}>{item.after}</div>
        </div>
      ))}
    </div>
  );
}
