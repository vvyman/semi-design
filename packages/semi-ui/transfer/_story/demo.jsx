import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
            {generateTree(children, checkedKeys)}
        </TreeNode>
    ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    const transferDataSource = [];
    function flatten(list = []) {
        list.forEach(item => {
            transferDataSource.push(item);
            flatten(item.children);
        });
    }
    flatten(dataSource);

    return (
        <Transfer
            {...restProps}
            targetKeys={targetKeys}
            dataSource={transferDataSource}
            className="tree-transfer"
            render={item => item.title}
            showSelectAll={false}
        >
            {({ direction, onItemSelect, selectedKeys }) => {
                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];
                    return (
                        <Tree
                            blockNode
                            checkable
                            checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            onCheck={(
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                            onSelect={(s,
                                _,
                                {
                                    node: {
                                        props: { eventKey },
                                    },
                                },
                            ) => {
                                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                            }}
                        >
                            {generateTree(dataSource, targetKeys)}
                        </Tree>
                    );
                }
            }}
        </Transfer>
    );
};

const treeData = [
    { key: '0-0', title: '0-0' },
    {
        key: '0-1',
        title: '0-1',
        children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }],
    },
    { key: '0-2', title: '0-3' },
];

class App extends React.Component {
    state = {
        targetKeys: [],
    };

    onChange = targetKeys => {
        console.log('Target Keys:', targetKeys);
        this.setState({ targetKeys });
    };

    render() {
        const { targetKeys } = this.state;
        return (
            <div>
                <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));