import React, { Component, useState, useDebugValue } from 'react';
import { storiesOf } from '@storybook/react'; // import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import withPropsCombinations from 'react-storybook-addon-props-combinations';
import { Button, TextArea, Icon } from '../../index';
import CustomTrigger from './CustomTrigger';
import AutoComplete from '../index';
import { result } from 'lodash';
import { IconSearch } from '@douyinfe/semi-icons';
const stories = storiesOf('AutoComplete', module); // stories.addDecorator(withKnobs);;

const props = {
    onBlur: (v, e) => {
        console.log('onBlur');
        console.log(v, e);
    },
    onFocus: (v, e) => {
        console.log('onFocus');
        console.log(v, e);
    },
};

class Demo extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            data2: ['mike', 'tony', 'steve'],
        };
        this.acref = React.createRef();
    }

    handleSearch(value) {
        // let data =  !value ? [] : [value, value + value, value + value + value];
        let result; // if (!value || value.indexOf('@') >= 0) {
        //     result = [];
        // } else {

        if (value) {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        } else {
            result = [];
        } // }

        this.setState({
            data: result,
        });
    }

    handleSearch2(value) {
        // let data2 =  !value ? [] : [value, value + value, value + value + value];
        let result;

        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }

        this.setState({
            data2: result,
        });
    }

    render() {
        const { data, data2 } = this.state;
        return (
            <div>
                <AutoComplete
                    placeholder="fe"
                    className="test-ac"
                    prefix={<IconSearch />}
                    showClear
                    data={data}
                    style={{
                        width: 300,
                    }}
                    onSearch={this.handleSearch.bind(this)}
                    onSelect={v => console.log(v)}
                    {...props}
                    ref={this.acref}
                />
            </div>
        );
    }
}

stories.add('基本使用', () => <Demo />);

class CustomOptionDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
        };
    }

    search = value => {
        let result;

        if (!value) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }

        this.setState({
            data: result,
        });
    };
    renderOption = item => {
        return (
            <>
                <span
                    style={{
                        color: 'pink',
                    }}
                >
                    邮箱
                </span>
                : <span>{item}</span>
            </>
        );
    };
    search2 = value => {
        let result;

        if (!value) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => {
                return {
                    email: `${value}@${domain}`,
                    time: new Date().valueOf(),
                    value: `${value}@${domain}`,
                };
            });
        }

        this.setState({
            data2: result,
        });
    };
    renderObjectOption = item => {
        return (
            <div>
                <span
                    style={{
                        color: 'pink',
                    }}
                >
                    邮箱
                </span>
                : <span>{item.email}</span>
                <span>time</span>: <span>{item.time}</span>
            </div>
        );
    };

    render() {
        return (
            <>
                <AutoComplete
                    showClear
                    data={this.state.data}
                    renderItem={this.renderOption}
                    style={{
                        width: '250px',
                    }}
                    optionLabelProp="value"
                    onSearch={this.search}
                ></AutoComplete>
                <br />
                <br />
                <AutoComplete
                    onChangeWithObject
                    style={{
                        width: '250px',
                    }}
                    renderItem={this.renderObjectOption}
                    renderSelectedItem={node => node.email}
                    data={this.state.data2}
                    onSearch={this.search2}
                />
            </>
        );
    }
}

stories.add('自定义选项内容', () => <CustomOptionDemo />);

class WithDefaultValue extends React.Component {
    constructor() {
        super();
        this.state = {
            data: ['semi@bytedance.com', 'semi@gmail.com', 'semi@163.com'],
        };
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(value) {
        let result;

        if (!value) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }

        this.setState({
            data: result,
        });
    }

    render() {
        let { data } = this.state;
        return (
            <>
                {/* <AutoComplete
           defaultValue='semi@bytedance.com'
           data={data}
           onSearch={this.onSearch}
        /> */}

                <AutoComplete defaultValue="semi" data={data} onSearch={this.onSearch} />
            </>
        );
    }
}

stories.add('defaultValue', () => <WithDefaultValue />);

class ControlledMode extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataObject: [],
            value: '',
        };
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSearch(value) {
        let result, resultObject;

        if (!value) {
            result = [];
            resultObject = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
            resultObject = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        }

        this.setState({
            data: result,
            dataObject: resultObject,
        });
    }

    onChange(value) {
        this.setState({
            value: value,
        });
    }

    render() {
        let { data, value, dataObject } = this.state;
        return (
            <>
                <AutoComplete
                    showClear
                    value={value}
                    data={data}
                    onChange={this.onChange}
                    onSearch={this.onSearch}
                    style={{
                        width: 200,
                    }}
                />
                <br />
                <AutoComplete
                    showClear
                    value={value}
                    data={dataObject}
                    onChange={this.onChange}
                    onSearch={this.onSearch}
                    style={{
                        width: 200,
                    }}
                />
                <br />
                <AutoComplete
                    defaultValue={'hello semi'}
                    showClear
                    value={value}
                    data={dataObject}
                    onChange={this.onChange}
                    onSearch={this.onSearch}
                    style={{
                        width: 200,
                    }}
                />
            </>
        );
    }
}

const EmptyContent = () => {
    let [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = v => {
        setLoading(true);
        setTimeout(() => {
            if (!v) {
                setData([]);
                setLoading(false);
                return;
            }

            setData(() => {
                const res = Array.from(Array(5)).map(c => Math.random());
                return res;
            });
            setLoading(false);
        }, 1000);
    };

    return <AutoComplete loading={loading} data={data} emptyContent={'空数据'} onSearch={fetchData} />;
};

const AutoFocus = () => {
    return <AutoComplete autoFocus />;
};

stories.add('value受控', () => <ControlledMode />);
stories.add('远程搜索', () => <Demo />);
stories.add(`CustomTrigger`, () => <CustomTrigger />);
stories.add(`Disabled`, () => {
    return <AutoComplete disabled />;
});
stories.add('emptyContent配合远程搜索数据展示', () => <EmptyContent />);
stories.add('autofocus', () => <AutoFocus />);
