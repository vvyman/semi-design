import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react'; // import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import withPropsCombinations from 'react-storybook-addon-props-combinations';
import './select.scss';
import { Input, Select, Button, Icon, Avatar, Checkbox, Form, withField, Space } from '../../index';
import CustomTrigger from './CustomTrigger';
import classNames from 'classnames';
import { getHighLightTextHTML } from '../../_utils/index';
const Option = Select.Option;
import { IconSearch, IconGift } from '@douyinfe/semi-icons';
const stories = storiesOf('Select', module); // stories.addDecorator(withKnobs);;

let Test = () => {
    let [options, setOptions] = useState([1, 2, 3, 4]);

    function add() {
        let newOptions = Array.from(
            {
                length: Math.floor(Math.random() * 10),
            },
            (v, i) => i + 1
        );
        setOptions(newOptions);
    }

    let style = {
        width: 150,
        margin: 20,
    };
    let slotStyle = {
        backgroundColor: 'whitesmoke',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 0 6px 6px',
    };
    let outSlotStyle = {
        backgroundColor: 'whitesmoke',
        height: '29px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    };

    const click = e => {};

    let outSlotNode = (
        <div onClick={e => click(e)}>
            <Checkbox>sendLarkNotification</Checkbox>
            <div>
                <Button theme="solid">confirm</Button>
            </div>
        </div>
    );
    return (
        <>
            <Select
                style={style}
                dropdownClassName="test-dropdown"
                dropdownStyle={{
                    width: 150,
                }}
                filter
                placeholder="fefe"
                position="rightTop"
                innerBottomSlot={
                    <div style={slotStyle}>
                        <Button
                            size="small"
                            style={{
                                margin: 0,
                            }}
                        >
                            申请其他地区权限
                        </Button>
                    </div>
                }
            >
                {options.map(option => (
                    <Option value={option} key={option} className="fefe">
                        {option}
                    </Option>
                ))}
            </Select>
            <Select
                style={{
                    marginTop: 20,
                    width: 200,
                }}
                dropdownClassName="test-dropdown"
                dropdownStyle={{
                    width: 150,
                }}
                filter
                placeholder="fefe"
                position="rightTop"
                outerBottomSlot={outSlotNode}
            >
                {options.map(option => (
                    <Option value={option} key={option} className="fefe">
                        {option}
                    </Option>
                ))}
            </Select>
        </>
    );
};

const AutoFocusDemo = () => {
    return (
        <>
            <Select
                autoFocus
                style={{
                    width: 200,
                }}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
            >
                <Option value="tiktok">抖音</Option>
                <Option value="hotsoon">火山</Option>
                <Option value="pipixia">皮皮虾</Option>
                <Option value="duoshan">多闪</Option>
                <Option value="xigua">西瓜视频</Option>
            </Select>
            <div className="test-div">test-div</div>
        </>
    );
};

stories.add('autoFocus', () => <AutoFocusDemo />);
stories.add('innerBottommSlot / outerBottomSlot', () => <Test />);
stories.add('innerTopSlot / outerTopSlot', () => {
    const slot = <div>未找到应用？</div>;
    return (
        <div>
            innerTopSlot
            <div>
                <Select
                    innerTopSlot={slot}
                    style={{
                        width: 250,
                    }}
                    maxHeight={150}
                >
                    <Option value="tiktok">抖音</Option>
                    <Option value="hotsoon">火山</Option>
                    <Option value="pipixia">皮皮虾</Option>
                    <Option value="duoshan">多闪</Option>
                    <Option value="xigua">西瓜视频</Option>
                </Select>
            </div>
            outerTopSlot
            <div>
                <Select
                    outerTopSlot={slot}
                    style={{
                        width: 250,
                    }}
                    maxHeight={150}
                >
                    <Option value="tiktok">抖音</Option>
                    <Option value="hotsoon">火山</Option>
                    <Option value="pipixia">皮皮虾</Option>
                    <Option value="duoshan">多闪</Option>
                    <Option value="xigua">西瓜视频</Option>
                </Select>
            </div>
        </div>
    );
});
stories.add('一个Option，其他数组', () => (
    <Select
        defaultValue={'all'}
        style={{
            width: 250,
        }}
    >
        <Option value="all" key="all">
            all
        </Option>
        {[1, 2, 3].map(item => (
            <Option value={`type${item}`} key={item}>{`type${item}`}</Option>
        ))}
    </Select>
));
let options = [
    {
        value: 'all',
        label: '全部',
        otherKey: 'all semi',
    },
    {
        value: 'tiktok',
        label: '抖音',
        otherKey: 'tiktok semi',
    },
    {
        value: 'hotsoon',
        label: '火山小视频',
        otherKey: 'hostsoom semi',
    },
    {
        value: 'pipixia',
        label: '皮皮虾',
        otherKey: 'pif',
    },
    {
        value: 'toutiao',
        label: '今日头条',
        otherKey: 'toutiao semi',
    },
    {
        value: 'rd',
        label: 'rd',
        otherKey: 'semi rd',
    },
    {
        value: 'ued',
        label: 'ued',
        otherKey: 'semi ued',
    },
    {
        value: 'ued',
        label: 'japan',
        otherKey: 'semi ued',
    },
    {
        value: '+86',
        label: '+86',
        otherKey: 'semi',
    },
];
let longOptions = options.concat({
    value: 'long',
    label: 'Semi Design 是一个设计系统，它定义了一套中后台设计与前端基础组',
});
stories.add('select size', () => (
    <div
        style={{
            margin: 20,
        }}
    >
        <h4>使用方不设width时，下拉菜单根据内容自动适配宽度（不推荐这样使用，select的宽度会动态变化）</h4>
        <Select
            defaultValue={'all'}
            optionList={options}
            style={{
                margin: 10,
            }}
        ></Select>
        <Select
            defaultValue={'long'}
            optionList={longOptions}
            style={{
                margin: 10,
            }}
        ></Select>
        <Select
            defaultValue={'tiktok'}
            size="large"
            optionList={options}
            style={{
                margin: 10,
            }}
        ></Select>
        {/* <Select defaultValue={'+86'} size="large" optionList={options}  style={{margin: 10}}>
    </Select> */}
        <h4>通过style设width的</h4>
        90px:{' '}
        <Select
            defaultValue={'all'}
            style={{
                width: 90,
                marign: 10,
            }}
            optionList={options}
        ></Select>
        120px:{' '}
        <Select
            defaultValue={'all'}
            style={{
                width: 120,
                margin: 10,
            }}
            optionList={options}
        ></Select>
        400px:{' '}
        <Select
            defaultValue={'all'}
            style={{
                width: 400,
                margin: 10,
            }}
            optionList={options}
        ></Select>
        <br />
        100%:{' '}
        <Select
            defaultValue={'all'}
            style={{
                width: '100%',
                margin: 10,
            }}
            optionList={options}
        ></Select>
        <br />
        <h4>通过css设width的</h4>
        <Select defaultValue={'all'} className="test-width" optionList={options}></Select>
        <br />
        <h4>dropdownMatchSelectWidth</h4>
        <p>当该项设为true时，下拉菜单最小宽度会等于Select宽度（默认为true）</p>
        <div
            style={{
                margin: 10,
            }}
        >
            style方式指定90px：
            <Select
                defaultValue={'all'}
                optionList={options}
                dropdownMatchSelectWidth={true}
                style={{
                    width: 90,
                }}
            />
        </div>
        <div
            style={{
                margin: 10,
            }}
        >
            css方式声明130px:
            <Select
                defaultValue={'all'}
                className="test-width"
                optionList={options}
                dropdownMatchSelectWidth={true}
            ></Select>
        </div>
        <div>
            <h4>需要强制下拉菜单与select同宽的时候</h4>
            <p>通过dropdownStyle覆盖min-width，将其设成与select的width同样的值</p>
            <Select
                defaultValue={'all'}
                style={{
                    width: 300,
                    margin: 10,
                }}
                dropdownStyle={{
                    width: 300,
                }}
                optionList={options}
            />
        </div>
    </div>
));
stories.add('with prefix / suffix / insetLabel, showClear, showArrow', () => (
    <>
        <h4>prefix & suffix</h4>
        <Select
            style={{
                width: '250px',
            }}
            optionList={options}
            prefix={<IconSearch />}
            suffix={<IconGift></IconGift>}
        ></Select>
        <h4>insetLabel</h4>
        <Select
            style={{
                width: '250px',
            }}
            optionList={options}
            insetLabel={'业务线'}
        ></Select>
        <h4>showClear</h4>
        <Select
            style={{
                width: '250px',
            }}
            optionList={options}
            showClear
        ></Select>
        <h4>showArrow = false</h4>
        <Select
            style={{
                width: '250px',
            }}
            optionList={options}
            showArrow={false}
        ></Select>

        <h4>defaultValue是不存在的值</h4>
        <Select
            style={{
                width: '250px',
            }}
            optionList={options}
            defaultValue="+85"
        ></Select>
    </>
));
stories.add('with default selected', () => (
    <Select
        style={{
            width: '250px',
        }}
        defaultValue={1}
    >
        <Option value={1}>opt1</Option>
        <Option value={2}>opt2</Option>
        <Option value={3}>opt3</Option>
        <Option value="4">opt4</Option>
    </Select>
));
stories.add('with scrollbar', () => (
    <Select
        style={{
            width: '250px',
        }}
        defaultValue={1}
    >
        <Option value={1}>opt1</Option>
        <Option value={2}>opt2</Option>
        <Option value={3}>opt3</Option>
        <Option value="4">opt4</Option>
        <Option value={5}>opt5</Option>
        <Option value={6}>opt6</Option>
        <Option value={7}>opt7</Option>
        <Option value="8">opt8</Option>
        <Option value={9}>opt9</Option>
        <Option value={10}>opt10dfsdfsdfdsfdsfsdf</Option>
        <Option value={11}>opt11</Option>
        <Option value="12">opt12jfldsjflsdjlfldjslfjhifsdfdsfdsffdsodsjlfhjl</Option>
    </Select>
));

class Link extends React.Component {
    get provinces() {
        return ['Sichuan', 'Guangdong'];
    }

    get maps() {
        return {
            Sichuan: ['Chengdu', 'Dujiangyan'],
            Guangdong: ['Guangzhou', 'Shenzhen', 'Dongguan'],
        };
    }

    constructor() {
        super();
        this.state = {
            provinces: this.provinces,
            maps: this.maps,
            citys: this.maps[this.provinces[0]],
            city: this.maps[this.provinces[0]][0],
        };
        this.provinceChange = this.provinceChange.bind(this);
        this.cityChange = this.cityChange.bind(this);
    }

    provinceChange(newProvince) {
        const { maps } = this.state;
        this.setState({
            citys: maps[newProvince],
            city: maps[newProvince][0],
        });
    }

    cityChange(city) {
        this.setState({
            city,
        });
    }

    render() {
        const { provinces, citys, city } = this.state;
        return (
            <React.Fragment>
                <Select
                    style={{
                        width: '150px',
                        margin: '10px',
                    }}
                    onChange={this.provinceChange}
                    defaultValue={provinces[0]}
                >
                    {provinces.map(pro => (
                        <Option value={pro} key={pro}>
                            {pro}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{
                        width: '150px',
                        margin: '10px',
                    }}
                    value={city}
                    onChange={this.cityChange}
                >
                    {citys.map(c => (
                        <Option value={c} key={c}>
                            {c}
                        </Option>
                    ))}
                </Select>
            </React.Fragment>
        );
    }
}

stories.add('select 联动', () => <Link />);
stories.add('select multiple', () => (
    <>
        <Select
            multiple={true}
            max={10}
            style={{
                width: '180px',
            }}
            placeholder="fefe"
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt3</Option>
            <Option value="4">opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
        <br />
        <br />
        <Select
            multiple={true}
            style={{
                width: '300px',
            }}
            defaultValue={[1, 2, 3]}
            placeholder="fefe"
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt3</Option>
            <Option value="4">opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
        <br />
        <br />
        <Select
            multiple={true}
            style={{
                width: '300px',
            }}
            defaultValue={[1, 2, 3]}
            placeholder="fefe"
            disabled
            onSelect={(...res) => console.log(res)}
            onDeselect={(...res) => console.log(res)}
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt3</Option>
            <Option value="4">opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
        <br />
        <br />
        maxTagCount = 3
        <Select
            multiple={true}
            maxTagCount={3}
            style={{
                width: '350px',
            }}
            defaultValue={[1, 2, 3]}
            placeholder="fefe"
            insetLabel="标签"
            onSelect={(...res) => console.log(res)}
            onDeselect={(...res) => console.log(res)}
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt3</Option>
            <Option value="4">opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
        <br />
        <br />
        maxTagCount = 3, max=5
        <Select
            multiple={true}
            maxTagCount={3}
            max={5}
            style={{
                width: '350px',
            }}
            defaultValue={[1, 2, 3]}
            placeholder="fefe"
            insetLabel="标签"
            onSelect={(...res) => console.log(res)}
            onDeselect={(...res) => console.log(res)}
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt3</Option>
            <Option value="4">opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
    </>
));
stories.add('select disabled', () => (
    <Select
        disabled
        multiple={true}
        max={10}
        style={{
            width: '250px',
        }}
    >
        <Option value={1}>opt1</Option>
        <Option value={2} disabled>
            opt2
        </Option>
        <Option value={3}>opt3</Option>
        <Option value="4">opt4</Option>
    </Select>
));

function filter(input, option) {
    console.log(option);
    return option.label.includes(input);
}

const spanStyle = {
    display: 'inline-block',
    marginRight: '8px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '1px solid var(--semi-color-bg-1)',
};
const colorOptions = [
    {
        value: 'grey-1',
        spanStyle: { ...spanStyle, backgroundColor: 'rgb(107, 116, 117)' },
    },
    {
        value: 'purple-5',
        spanStyle: { ...spanStyle, backgroundColor: 'rgb(158, 40, 179)' },
    },
    {
        value: 'pink-2',
        spanStyle: { ...spanStyle, backgroundColor: 'rgb(233, 30, 99)' },
    },
    {
        value: 'blue-3',
        spanStyle: { ...spanStyle, backgroundColor: 'rgb(0, 119, 250)' },
    },
];
const alignStyle = {
    display: 'flex',
    alignItems: 'center',
};

const customFilter = (input, option) => {
    return option.value.includes(input);
};

stories.add('select filter single', () => (
    <div>
        <h5>默认筛选</h5>
        <Select
            filter
            style={{
                width: '250px',
                margin: 10,
            }}
            autoFocus
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
        >
            <Option value={1}>opt1</Option>
            <Option value={2} disabled>
                disabled
            </Option>
            <Option value={3}>Lucy</Option>
            <Option value="4">bay</Option>
            <Option value="5">sert</Option>
            <Option value="6">wym</Option>
            <Option value="7" disabled>
                meno
            </Option>
            <Option value="8">opts</Option>
        </Select>
        <h5>自定义筛选函数</h5>
        <Select
            style={{
                width: '250px',
                margin: 10,
            }}
            filter={filter}
            onBlur={() => console.log('onBlur')}
            onFocus={() => console.log('onFocus')}
        >
            <Option value={1}>opt1(value:1)</Option>
            <Option value={2}>mike(value:2)</Option>
            <Option value={3}>Lucy(value:3)</Option>
            <Option value={4}>bay(value:4)</Option>
        </Select>
        <h5>filter为true，但option label为node时</h5>
        <Select
            style={{
                width: '250px',
                margin: 10,
            }}
            filter={customFilter}
            onChange={v => console.log(v)}
            insetLabel="insetLabel"
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
        >
            {colorOptions.map(option => (
                <Option value={option.value} key={option.value}>
                    <div style={alignStyle}>
                        <span style={option.spanStyle}></span>
                        {option.value}
                    </div>
                </Option>
            ))}
        </Select>
    </div>
));
stories.add('select filter multiple', () => (
    <>
        <Select
            filter
            multiple={true}
            style={{
                width: '250px',
            }}
            placeholder="fefe"
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt22</Option>
            <Option value={3}>opt3</Option>
            <Option value={4}>opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
        <Select
            filter
            multiple={true}
            maxTagCount={3}
            style={{
                width: '270px',
            }}
            placeholder="fefe"
        >
            <Option value={1}>opt1</Option>
            <Option value={2}>opt2</Option>
            <Option value={3}>opt22</Option>
            <Option value={3}>opt3</Option>
            <Option value={4}>opt4</Option>
            <Option value={5}>opt5</Option>
            <Option value={6}>opt6</Option>
            <Option value={7}>opt7</Option>
            <Option value={8}>opt8</Option>
        </Select>
    </>
));

const OptionLabelProp = () => {
    const [value, setValue] = useState(1);
    return (
        <>
            设置optionLabelProp属性(默认为'children')为'value'时，回填到选择框中的文本会是Option.value
            <br></br>
            <Select
                style={{
                    width: '250px',
                }}
                defaultValue={1}
                optionLabelProp="value"
            >
                <Option value={1}>opt1</Option>
                <Option value={2}>opt2</Option>
                <Option value={3}>
                    <span
                        style={{
                            color: 'pink',
                        }}
                    >
                        opt3 Node
                    </span>
                </Option>
                <Option value="4">
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        testNode
                    </span>
                </Option>
            </Select>
            <br />
            <br />
            <Select
                style={{
                    width: '250px',
                }}
                value={value}
                optionLabelProp="value"
                onChange={setValue}
            >
                <Option value={1}>opt1</Option>
                <Option value={2}>opt2</Option>
                <Option value={3}>
                    <span
                        style={{
                            color: 'pink',
                        }}
                    >
                        opt3 Node
                    </span>
                </Option>
                <Option value="4">
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        testNode
                    </span>
                </Option>
            </Select>
            <br />
            <br />
            <Select
                style={{
                    width: '250px',
                }}
                defaultValue={1}
            >
                <Option value={1}>children Label Text 1</Option>
                <Option value={2}>opt2</Option>
                <Option value={3}>opt3</Option>
                <Option value="4">
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        testNode
                    </span>
                </Option>
            </Select>
            <Select
                style={{
                    width: '250px',
                }}
                defaultValue={1}
                filter
                optionLabelProp="value"
            >
                <Option value={1}>children Label Text 1</Option>
                <Option value={2}>opt2</Option>
                <Option value={3}>opt3</Option>
                <Option value="4">
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        testNode
                    </span>
                </Option>
            </Select>
            <br />
            <br />
            多选
            <Select
                style={{
                    width: '250px',
                }}
                multiple
                filter
                optionLabelProp="value"
            >
                <Option value={1}>children Label Text 1</Option>
                <Option value={2}>opt2</Option>
                <Option value={3}>opt3</Option>
                <Option value="4">
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        testNode
                    </span>
                </Option>
            </Select>
        </>
    );
};

class CustomRender extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [
                {
                    name: '夏可漫',
                    email: 'xiakeman@example.com',
                    abbr: 'XK',
                    color: 'amber',
                },
                {
                    name: '申悦',
                    email: 'shenyue@example.com',
                    abbr: 'SY',
                    color: 'indigo',
                },
                {
                    name: '曲晨一',
                    email: 'quchenyi@example.com',
                    abbr: 'CY',
                    color: 'blue',
                },
                {
                    name: '文嘉茂',
                    email: 'wenjiamao@example.com',
                    abbr: 'JM',
                    color: 'cyan',
                },
            ],
        };
    }

    renderCustomOption(item) {
        let optionStyle = {
            display: 'flex',
        };
        return (
            <Option value={item.name} style={optionStyle} showTick={false} {...item}>
                <Avatar color={item.color} size="small">
                    {item.abbr}
                </Avatar>
                <div
                    style={{
                        marginLeft: 4,
                    }}
                >
                    <p
                        style={{
                            fontSize: 14,
                            margin: 4,
                        }}
                    >
                        {item.name}
                    </p>
                    <p
                        style={{
                            margin: 4,
                        }}
                    >
                        {item.email}
                    </p>
                </div>
            </Option>
        );
    }

    renderSelectedItem(optionNode) {
        return (
            <div>
                <Avatar color={optionNode.color} size="small">
                    {optionNode.abbr}
                </Avatar>
                <span
                    style={{
                        margin: 8,
                    }}
                >
                    {optionNode.email}
                </span>
            </div>
        );
    }

    renderMultipleSelectedItem(optionNode) {
        let content = (
            <div>
                <Avatar color={optionNode.color} size="small">
                    {optionNode.abbr}
                </Avatar>
            </div>
        );
        return {
            isRenderInTag: true,
            content,
        };
    }

    renderMultipleWithoutTag(optionNode, { onClose, index }) {
        let content = (
            <div>
                <Avatar color={optionNode.color} size="small">
                    {optionNode.abbr}
                </Avatar>
            </div>
        );
        return {
            isRenderInTag: false,
            content,
        };
    }

    render() {
        const { list } = this.state;
        return (
            <React.Fragment>
                <Select
                    style={{
                        width: 300,
                        height: 40,
                    }}
                    onChange={this.provinceChange}
                    defaultValue={'夏可漫'}
                    renderSelectedItem={this.renderSelectedItem}
                >
                    {list.map(item => this.renderCustomOption(item))}
                </Select>
                <Select
                    style={{
                        width: 360,
                        height: 60,
                        marginTop: 20,
                    }}
                    onChange={this.provinceChange}
                    defaultValue={['夏可漫', '申悦']}
                    multiple
                    renderSelectedItem={this.renderMultipleSelectedItem}
                >
                    {list.map(item => this.renderCustomOption(item))}
                </Select>
                <Select
                    style={{
                        width: 360,
                        height: 60,
                        marginTop: 20,
                    }}
                    onChange={this.provinceChange}
                    defaultValue={['夏可漫', '申悦']}
                    multiple
                    renderSelectedItem={this.renderMultipleWithoutTag}
                >
                    {list.map(item => this.renderCustomOption(item))}
                </Select>
            </React.Fragment>
        );
    }
}

stories.add('自定义已选标签渲染', () => (
    <>
        renderSelectedItem
        <CustomRender />
        <br />
        <br />
        OptionLabelProp
        <OptionLabelProp />
    </>
));

const ControledSelect = () => {
    const [value, setValue] = useState('nick');
    const [value2, setValue2] = useState('jerry');
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState(['nick']);
    const [value5, setValue5] = useState();
    return (
        <>
            <span>value + onChange</span>
            <Select
                value={value}
                onChange={setValue}
                style={{
                    width: 200,
                }}
            >
                <Option value="nick">nick</Option>
                <Option value="jerry">jerry</Option>
                <Option value="mark">mark</Option>
            </Select>

            <br />
            <br />
            <span>只传value，不传onChange</span>
            <Select
                value={value2}
                style={{
                    width: 200,
                }}
            >
                <Option value="nick">nick</Option>
                <Option value="jerry">jerry</Option>
                <Option value="mark">mark</Option>
            </Select>
            <br />
            <br />

            <span>value + onChange , 多选</span>
            <Select
                value={value3}
                onChange={setValue3}
                multiple
                style={{
                    width: 200,
                }}
            >
                <Option value="nick">nick</Option>
                <Option value="jerry">jerry</Option>
                <Option value="mark">mark</Option>
                <Option value="nick2">nick2</Option>
                <Option value="jerry2">jerry2</Option>
                <Option value="mark2">mark2</Option>
            </Select>
            <br />
            <br />

            <span>value, 多选</span>
            <Select
                value={value4}
                multiple
                style={{
                    width: 200,
                }}
            >
                <Option value="nick">nick</Option>
                <Option value="jerry">jerry</Option>
                <Option value="mark">mark</Option>
            </Select>

            <br />
            <h5>filter为true，但option label为node时</h5>
            <Select
                style={{
                    width: '250px',
                }}
                filter={customFilter}
                onChange={v => console.log(v)}
                insetLabel="insetLabel"
                value={value5}
                onChange={setValue5}
            >
                {colorOptions.map(option => (
                    <Option value={option.value} key={option.value}>
                        <div style={alignStyle}>
                            <span style={option.spanStyle}></span>
                            {option.value}
                        </div>
                    </Option>
                ))}
            </Select>
        </>
    );
};

stories.add('受控组件', () => <ControledSelect></ControledSelect>);

const UnControledSelect = () => {
    const onChange = value => {
        console.log(value);
    };

    return (
        <>
            <h5>defaultValue在list中不存在</h5>
            <Select
                defaultValue={90}
                onChange={onChange}
                style={{
                    width: 200,
                }}
            >
                <Option value={20}>nick</Option>
                <Option value={10}>jerry</Option>
                <Option value={5}>mark</Option>
            </Select>
            <h5>defaultValue在list中存在</h5>
            <Select
                defaultValue={10}
                onChange={onChange}
                style={{
                    width: 200,
                }}
            >
                <Option value={20}>nick</Option>
                <Option value={10}>jerry</Option>
                <Option value={5}>mark</Option>
            </Select>
        </>
    );
};

stories.add('非受控组件', () => <UnControledSelect></UnControledSelect>);
stories.add('test scroll', () => (
    <div
        style={{
            marginTop: '600px',
            marginBottom: '50px',
        }}
    >
        <Select
            style={{
                width: '150px',
            }}
        >
            <Option value="tony">IronMan</Option>
            <Option value="Thor" disabled>
                Thor
            </Option>
            <Option value="steve">Caption</Option>
            <Option value="peter">SpiderBoy</Option>
        </Select>
    </div>
));
let optionList = [
    {
        value: 'tony',
        label: 'Ironman',
    },
    {
        value: 'Thor',
        label: 'Thor',
    },
    {
        value: 'steve',
        label: 'Caption',
    },
    {
        value: 'peter',
        label: 'SpiderBoy',
    },
];
stories.add('optionList方式传入', () => (
    <Select
        style={{
            width: '100px',
        }}
        optionList={optionList}
    ></Select>
));
stories.add('insetLabel', () => (
    <>
        <Select
            style={{
                width: 300,
            }}
            insetLabel="主播类型"
            placeholder="请选择"
            optionList={optionList}
        ></Select>
        <Select
            style={{
                width: 300,
            }}
            multiple
            insetLabel="主播类型"
            optionList={optionList}
        ></Select>
        <Select
            style={{
                width: 300,
            }}
            filter
            insetLabel="主播类型"
            optionList={optionList}
        ></Select>
        <Select
            style={{
                width: 300,
            }}
            filter
            multiple
            insetLabel="主播类型"
            optionList={optionList}
        ></Select>
    </>
));
stories.add('change option dynamic', () => {
    function App() {
        let [options, setOptions] = useState([]);
        let [index, setIndex] = useState(0);

        const addOption = () => {
            const randomItem = optionList[index];
            index = index + 1;
            setIndex(index);
            options = [...options, { ...randomItem }];
            setOptions(options);
        };

        const reset = () => {
            setOptions([]);
            setIndex(0);
        };

        return (
            <div>
                <Select
                    style={{
                        width: '150px',
                    }}
                    defaultValue="tony"
                >
                    {options.map((option, idx) => (
                        <Select.Option key={option.key || idx} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
                <h4>多选</h4>
                <Select
                    style={{
                        width: '150px',
                    }}
                    multiple
                    defaultValue={['tony']}
                >
                    {options.map((option, idx) => (
                        <Select.Option key={option.key || idx} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
                <button onClick={addOption}>add option</button>
                <button onClick={reset}>reset</button>
            </div>
        );
    }

    return <App />;
});
let list = [
    {
        value: 'tony',
        label: 'Ironman',
        otherKey: {
            role: 1,
        },
    },
    {
        value: 'Thor',
        label: 'Thor',
        otherKey: {
            role: 2,
        },
    },
    {
        value: 'steve',
        label: 'Caption',
        otherKey: {
            role: 3,
        },
    },
    {
        value: 'peter',
        label: 'SpiderBoy',
        otherKey: {
            role: 4,
        },
    },
];

const SearchDemo1 = () => {
    const [optionList, setOptionList] = useState(list);
    const [loading, setLoading] = useState(false);

    const handleSearch = value => {
        setLoading(true);
        let length = Math.ceil(Math.random() * 10);
        let result = Array.from(
            {
                length,
            },
            (v, i) => {
                return {
                    value: value + i,
                    label: value + i,
                    otherKey: {
                        role: i,
                    },
                };
            }
        );
        setTimeout(() => {
            setOptionList(result);
            setLoading(false);
        }, 1000);
    };

    const [value, setValue] = useState(optionList[0].value);

    const onChange = value => {
        console.log(value);
        setValue(value);
    };

    return (
        <div>
            受控：
            <Select
                filter
                style={{
                    width: '150px',
                }}
                onSearch={v => handleSearch(v)}
                optionList={optionList}
                value={value}
                loading={loading}
                onChange={onChange}
            ></Select>
            非受控：
            <Select
                style={{
                    width: '150px',
                }}
                filter
                onSearch={v => handleSearch(v)}
                optionList={optionList}
                loading={loading}
                onChange={onChange}
            ></Select>
            多选非受控
            <Select
                style={{
                    width: '150px',
                }}
                filter
                multiple
                onSearch={v => handleSearch(v)}
                optionList={optionList}
                loading={loading}
                onChange={onChange}
            ></Select>
        </div>
    );
};

import debounce from 'lodash/debounce';

class SearchDemo2 extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            optionList: [
                {
                    value: 'tiktok',
                    label: '抖音',
                    type: 1,
                },
                {
                    value: 'hotsoon',
                    label: '火山小视频',
                    type: 2,
                },
                {
                    value: 'pipixia',
                    label: '皮皮虾',
                    type: 3,
                },
                {
                    value: 'toutiao',
                    label: '今日头条',
                    type: 4,
                },
            ],
            value: [],
        };
        this.handleSearch = debounce(this.handleSearch, 800).bind(this);
        this.onChange = this.onChange.bind(this);
        this.customRender = this.customRender.bind(this);
    }

    handleSearch(inputValue) {
        this.setState({
            loading: true,
        });
        let length = Math.ceil(Math.random() * 100);
        let result = Array.from(
            {
                length,
            },
            (v, i) => {
                return {
                    value: inputValue + i,
                    label: 'label' + i,
                    type: i + 1,
                };
            }
        );
        setTimeout(() => {
            this.setState({
                optionList: result,
                loading: false,
            });
        }, 2000);
    }

    onChange(value) {
        this.setState({
            value,
        });
        console.log(value);
    }

    customRender(optionNode) {
        return optionNode.value + optionNode.label;
    }

    render() {
        const { loading, optionList, value } = this.state;
        return (
            <div>
                <Select
                    style={{
                        width: 150,
                    }}
                    filter
                    labelInValue
                    onSearch={this.handleSearch}
                    optionList={optionList}
                    loading={loading}
                    onChange={this.onChange}
                    placeholder="请选择"
                ></Select>
                <br />
                <br />
                <Select
                    style={{
                        width: 180,
                    }}
                    filter // labelInValue
                    multiple
                    value={value}
                    renderSelectedItem={this.customRender}
                    onSearch={this.handleSearch}
                    optionList={optionList}
                    loading={loading}
                    onChange={this.onChange}
                    placeholder="请选择"
                ></Select>
            </div>
        );
    }
}

stories.add('搜索', () => (
    <>
        <SearchDemo1 />
        <SearchDemo2 />
    </>
));
export const IncomeDetail = ({ config }) => {
    const [detailList, setDetailList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState();

    const fetchData = (outParams = {}) => {
        if (lock) {
            return;
        }

        setLoading(true); // 参数
        // 请求

        fetch({
            url: URL.user_profit,
            method: 'get',
            baseURL: config.webcast_host,
            params,
        })
            .then(res => {
                lock = false;
                setLoading(false);
                console.log('++++', data);
            })
            .catch(() => {
                setLoading(false);
                Toast.show('网络异常,请稍后重试');
            });
    };

    useEffect(fetchData, []); // 监听滚动设置吸顶 以及加载更多

    useEffect(() => {
        window.addEventListener('scroll', function() {
            // 加载更多
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const screenHeight = screen.height;

            if (!loading && hasMore && scrollY + screenHeight + 300 > scrollHeight) {
                fetchData();
            }
        });
    }, [detailList.length]);
    return (
        <div>
            <Select></Select>
        </div>
    );
};
stories.add('allowCreate', () => (
    <Select
        style={{
            width: 500,
        }}
        optionList={optionList}
        allowCreate={true}
        multiple={true}
        filter={true}
        onChange={v => console.log(v)}
    ></Select>
));
stories.add('allowCreate custom render', () => (
    <Select
        style={{
            width: 500,
        }}
        optionList={optionList}
        allowCreate={true}
        multiple={true}
        filter={true}
        onChange={v => console.log(v)}
        renderCreateItem={v => `semi: ${v}`}
    ></Select>
));

let AllowCreateControledDemo = () => {
    let [value, setValue] = useState();
    const optionList = [
        {
            value: 'tiktok',
            label: '抖音',
        },
        {
            value: 'hotsoon',
            label: '火山小视频',
        },
        {
            value: 'pipixia',
            label: '皮皮虾',
        },
        {
            value: 'toutiao',
            label: '今日头条',
        },
    ];
    const [list, setList] = useState(optionList);

    const handleSelect = v => {
        var lastOne = v[v.length - 1];

        if (lastOne && list.findIndex(item => item.value === lastOne) == -1) {
            list.push({
                value: lastOne,
                label: lastOne,
            });
        }

        setList(list);
        setValue(v);
    };

    return (
        <Select
            style={{
                width: 400,
            }}
            optionList={list}
            allowCreate={true}
            multiple={true}
            filter={true}
            value={value}
            onChange={handleSelect}
        ></Select>
    );
};

const AllowCreateDemo = () => {
    let [value, setValue] = useState();
    const optionList = [
        {
            value: 'tiktok',
            label: '抖音',
        },
        {
            value: 'hotsoon',
            label: '火山小视频',
        },
        {
            value: 'pipixia',
            label: '皮皮虾',
        },
        {
            value: 'toutiao',
            label: '今日头条',
        },
    ];
    const [list, setList] = useState(optionList);

    const handleSelect = v => {
        var lastOne = v[v.length - 1];

        if (lastOne && list.findIndex(item => item.value === lastOne) == -1) {
            list.push({
                value: lastOne,
                label: lastOne,
            });
        }

        setList(list); // setValue(v)
    };

    return (
        <Select
            style={{
                width: 400,
            }}
            optionList={list}
            defaultValue={['tiktok', 'hotsoon']}
            allowCreate={true}
            multiple={true}
            filter={true}
            onChange={handleSelect}
        ></Select>
    );
};

stories.add('allowCreate 带默认值', () => <AllowCreateDemo />);

class HideDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionList: [
                {
                    value: 'tiktok',
                    label: '抖音',
                },
                {
                    value: 'hotsoon',
                    label: '火山小视频',
                },
                {
                    value: 'pipixia',
                    label: '皮皮虾',
                },
                {
                    value: 'toutiao',
                    label: '今日头条',
                },
            ],
            selectedItems: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(selectedItems) {
        this.setState({
            selectedItems,
        });
    }

    render() {
        let { optionList, selectedItems } = this.state;
        let filterOptions = optionList.filter(option => !selectedItems.includes(option.value));
        return (
            <Select
                value={selectedItems}
                multiple
                style={{
                    width: 300,
                }}
                onChange={this.onChange}
                optionList={filterOptions}
            ></Select>
        );
    }
}

stories.add('自动隐藏已选项', () => <HideDemo></HideDemo>);

class CustomCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionList: [
                {
                    value: 'tiktok',
                    label: '抖音',
                },
                {
                    value: 'hotsoon',
                    label: '火山小视频',
                },
                {
                    value: 'pipixia',
                    label: '皮皮虾',
                },
                {
                    value: 'toutiao',
                    label: '今日头条',
                },
                {
                    value: 0,
                    label: 0,
                },
            ],
            selectedItems: ['fefe'],
        };
        this.onChange = this.onChange.bind(this);
        this.customRender = this.customRender.bind(this);
        this.search = this.search.bind(this);
    }

    onChange(selectedItems) {
        console.log(selectedItems); // this.setState({ selectedItems, optionList: [] });

        this.setState({
            selectedItems,
        }); // this.setState({ optionList: [] });
    }

    customRender(v) {
        return (
            <>
                <span>label:{v.label}</span>
                <span>value:{v.value}</span>
            </>
        );
    }

    customCreate(inputValue, isFocus) {
        let style = {
            padding: 12,
            cursor: 'pointer',
            backgroundColor: isFocus ? 'var(--semi-color-fill-0)' : '#FFF',
        };
        return <div style={style}>{'create' + inputValue}</div>;
    }

    search(inputValue) {
        let length = Math.ceil(Math.random() * 10);
        let result = Array.from(
            {
                length,
            },
            (v, i) => {
                return {
                    value: inputValue + i,
                    label: inputValue + i,
                    type: i + 1,
                };
            }
        );
        console.log(result); // result = result.concat(selectedOption);

        this.setState({
            optionList: result,
        });
    }

    render() {
        let { optionList, selectedItems } = this.state;
        return (
            <>
                <Select
                    defaultValue={['tiktok']}
                    filter
                    style={{
                        width: 300,
                    }}
                    multiple
                    optionList={optionList}
                    onSearch={this.search}
                    onChange={this.onChange}
                    emptyContent={null} // onChangeWithObject
                ></Select>
            </>
        );
    }
}

stories.add('CustomCreate', () => <CustomCreate></CustomCreate>);

class OptionGroupDemo extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            groups: [
                {
                    label: 'Asia',
                    children: [
                        {
                            label: 'China',
                            value: 'zhongguo',
                        },
                        {
                            label: 'Koera',
                            value: 'hanguo',
                        },
                    ],
                },
                {
                    label: 'Europe',
                    children: [
                        {
                            label: 'Germany',
                            value: 'deguo',
                        },
                        {
                            label: 'France',
                            value: 'faguo',
                        },
                    ],
                },
                {
                    label: 'Other',
                    children: [
                        {
                            label: 'vf',
                            value: 'Sourth',
                        },
                    ],
                },
            ],
        };
    }

    handleSearch(input) {
        let groups = [1, 2, 3].map(i => {
            return {
                label: i,
                // label: Math.random(),
                children: [10, 20].map(j => {
                    return {
                        label: Math.random(),
                        value: Math.random(),
                    };
                }),
            };
        });
        this.setState({
            groups,
        });
    }

    renderGroup(group) {
        let options = group.children.map(option => (
            <Select.Option value={option.value} label={option.label} key={option.label}></Select.Option>
        ));
        return <Select.OptGroup label={group.label}>{options}</Select.OptGroup>;
    }

    render() {
        let { groups } = this.state;
        return (
            <>
                <Select
                    placeholder=""
                    style={{
                        width: 180,
                    }}
                    filter
                    onSearch={this.handleSearch}
                    remote
                >
                    {groups.map(group => this.renderGroup(group))}
                </Select>
            </>
        );
    }
}

stories.add('Select OptionGroup', () => <OptionGroupDemo></OptionGroupDemo>);

const BlurDemo = () => {
    const onBlur = (value, e) => {
        console.log(value);
        console.log(e);
    };

    const onFocus = (value, e) => {
        console.log(value);
        console.log(e);
    };

    return (
        <>
            <Select
                filter
                placeholder=""
                style={{
                    width: 180,
                }}
                onBlur={onBlur}
                onFocus={onFocus}
            >
                <Select.Option value="zhongguo">China</Select.Option>
                <Select.Option value="hanguo">Koera</Select.Option>
                <Select.Option value="deguo">Germany</Select.Option>
                <Select.Option value="faguo">France</Select.Option>
            </Select>
        </>
    );
};

stories.add('Select onBlur/onFocus', () => <BlurDemo></BlurDemo>); // stories.add('BugDemo', () => <BugDemo></BugDemo>);

const AutoAdjustOverflowDemo = () => {
    const [list, setList] = useState([
        {
            value: 'tiktok',
            label: '1111',
        },
        {
            value: 'hotsoon',
            label: '1112',
        },
        {
            value: 'pipixia',
            label: '1113',
        },
        {
            value: 'toutiao',
            label: '1114',
        },
    ]);

    const onSearch = () => {
        let newList = Array.from(
            {
                length: Math.floor(Math.random() * 10),
            },
            (v, i) => {
                return {
                    value: i,
                    label: i,
                };
            }
        );
        setList(newList);
        console.log(newList);
    };

    return (
        <div
            style={{
                height: 180,
                margin: 250,
                border: '1px solid pink',
            }}
        >
            <Select
                optionList={list}
                filter={true}
                remote={true}
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
                multiple
            />
        </div>
    );
};

stories.add('autoAdjustOverflow', () => <AutoAdjustOverflowDemo></AutoAdjustOverflowDemo>);

const AllowCreateWithFilter = () => {
    const [list, setList] = useState([
        {
            value: 'tiktok',
            label: 'tiktok',
            otherKey: 'abc',
        },
        {
            value: 'hotsoon',
            label: 'hotsoon',
            otherKey: 'efg',
        },
        {
            value: 'pipixia',
            label: 'pipixia',
            otherKey: 'hij',
        },
        {
            value: 'toutiao',
            label: 'toutiao',
            otherKey: 'klm',
        },
    ]);

    const filter = (sugInput, option) => {
        let compareKey = option.otherKey ? option.otherKey.toUpperCase() : '';
        let sug = sugInput.toUpperCase();
        return compareKey.includes(sug);
    };

    return (
        <div
            style={{
                height: 180,
                margin: 250,
            }}
        >
            <Select
                optionList={list}
                multiple
                filter={filter}
                style={{
                    width: 200,
                }}
                allowCreate
            />
        </div>
    );
};

stories.add('Filter + allowCreate', () => <AllowCreateWithFilter></AllowCreateWithFilter>);

const SelectRefDemo = () => {
    const ref = useRef();
    const secondRef = useRef();
    const [open, setOpen] = useState(false);
    const list = [
        {
            value: 'tiktok',
            label: 'Tiktok',
        },
        {
            value: 'hotsoon',
            label: 'Hotsoon',
        },
        {
            value: 'pipixia',
            label: 'Pipixia',
        },
        {
            value: 'toutiao',
            label: 'TooBuzz',
        },
    ];

    const change = () => {
        if (!open) {
            ref.current.open();
            setOpen(true);
        } else {
            ref.current.close();
            setOpen(false);
        }
    };

    const focus = () => {
        ref.current.focus();
    };

    const clearInput = () => {
        ref.current.clearInput();
    };

    const deselectAll = () => {
        ref.current.deselectAll();
    };

    const selectAll = () => {
        ref.current.selectAll();
    };

    return (
        <>
            <h4>onChangeWithObject = false</h4>
            <Select
                innerBottomSlot={
                    <div>
                        <Space>
                            <Button onClick={change}>close</Button>
                            <Button onClick={clearInput}>clearInput</Button>
                            <Button onClick={deselectAll}>deselectAll</Button>
                            <Button onClick={selectAll}>selectAll</Button>
                        </Space>
                    </div>
                }
                ref={ref}
                onChange={e => console.log(e)}
                placeholder="Business line"
                style={{
                    width: 180,
                }}
                optionList={list}
                filter
                multiple
            ></Select>
            <Space>
                <Button onClick={change}>open</Button>
                <Button onClick={focus}>focus</Button>
                <Button onClick={clearInput}>clearInput</Button>
                <Button onClick={deselectAll}>deselectAll</Button>
                <Button onClick={selectAll}>selectAll</Button>
            </Space>
            <h4
                style={{
                    marginTop: 20,
                }}
            >
                onChangeWithObject = true
            </h4>
            <Select
                innerBottomSlot={
                    <div>
                        <Space></Space>
                    </div>
                }
                onChange={e => console.log(e)}
                onChangeWithObject
                ref={secondRef}
                placeholder="Business line"
                style={{
                    width: 180,
                }}
                optionList={list}
                filter
                multiple
            ></Select>
            <Space>
                <Button onClick={() => secondRef.current.deselectAll()}>deselectAll</Button>
                <Button onClick={() => secondRef.current.selectAll()}>selectAll</Button>
            </Space>
        </>
    );
};

stories.add('ref', () => <SelectRefDemo />);
stories.add(`custom trigger`, () => <CustomTrigger />); // class VirtualizeDemo extends React.Component {
//     constructor(props) {
//         super(props);
//         // this.handleSearch = this.handleSearch.bind(this);
//         let newOptions = Array.from({ length: 1000 }, (v, i) => ({ label: `option-${i}`, value: i }));
//         this.state = {
//             optionList: newOptions,
//         };
//     }
//     render() {
//         let { groups, optionList } = this.state;
//         let virtualize = {
//             height: 300,
//             widht: '100%',
//             itemSize: 36,
//         };
//         return (
//             <>
//                 <Select
//                     placeholder=""
//                     style={{ width: 180 }}
//                     filter
//                     onSearch={this.handleSearch}
//                     virtualize={virtualize}
//                     optionList={optionList}
//                 ></Select>
//             </>
//         );
//     }
// }
// stories.add(`virtualize select`, () => <VirtualizeDemo />);

const SelectPosition = () => {
    return (
        <div
            style={{
                height: 500,
                border: '1px solid red',
                overflow: 'auto',
            }}
        >
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <Select
                defaultValue="tiktok"
                style={{
                    width: 120,
                }}
            >
                <Option value="tiktok">抖音</Option>
                <Option value="hotsoon">火山</Option>
                <Option value="pipixia" disabled>
                    皮皮虾
                </Option>
                <Option value="xigua">西瓜视频</Option>
            </Select>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
            <p>p</p>
        </div>
    );
};

stories.add(`Select position problem`, () => <SelectPosition />);

const RenderOptionDemo = () => {
    const renderOptionItem = renderProps => {
        const {
            disabled,
            selected,
            label,
            value,
            focused,
            className,
            style,
            onMouseEnter,
            onClick,
            empty,
            emptyContent,
            ...rest
        } = renderProps;
        const optionCls = classNames({
            ['custom-option-render']: true,
            ['custom-option-render-focused']: focused,
            ['custom-option-render-disabled']: disabled,
            ['custom-option-render-selected']: selected,
        }); // Notice：
        // 1.props传入的style需在wrapper dom上进行消费，否则在虚拟化场景下会无法正常使用
        // 2.选中(selected)、聚焦(focused)、禁用(disabled)等状态的样式需自行加上，你可以从props中获取到相对的boolean值
        // 3.onMouseEnter需在wrapper dom上绑定，否则上下键盘操作时显示会有问题

        return (
            <div style={style} className={optionCls} onClick={() => onClick()} onMouseEnter={e => onMouseEnter()}>
                <Checkbox checked={selected} />
                <div className="option-right">{label}</div>
            </div>
        );
    };

    return (
        <>
            <Select
                filter
                dropdownClassName="components-select-demo-renderOptionItem"
                optionList={optionList}
                style={{
                    width: 300,
                }}
                renderOptionItem={renderOptionItem}
            />
            <br />
            <br />
            <Select
                filter
                multiple
                dropdownClassName="components-select-demo-renderOptionItem"
                optionList={optionList}
                style={{
                    width: 450,
                }}
                renderOptionItem={renderOptionItem}
            />
        </>
    );
};

stories.add('renderOptionItem', () => <RenderOptionDemo />);

const FilterDefaultOpen = () => {
    const [value1, setValue1] = useState('a-1');
    return (
        <>
            <Select
                placeholder=""
                style={{
                    width: 180,
                }}
                filter
                defaultOpen
            >
                <Select.OptGroup label="Asia">
                    <Select.Option value="a-1">China</Select.Option>
                    <Select.Option value="a-2">Koera</Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="Europe">
                    <Select.Option value="b-1">Germany</Select.Option>
                    <Select.Option value="b-2">France</Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="South America">
                    <Select.Option value="c-1">Peru</Select.Option>
                </Select.OptGroup>
            </Select>
            <Select
                placeholder=""
                style={{
                    width: 180,
                    marginLeft: 20,
                }}
                filter
                defaultOpen
                defaultValue="a-2"
            >
                <Select.OptGroup label="Asia">
                    <Select.Option value="a-1">China</Select.Option>
                    <Select.Option value="a-2">Koera</Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="Europe">
                    <Select.Option value="b-1">Germany</Select.Option>
                    <Select.Option value="b-2">France</Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="South America">
                    <Select.Option value="c-1">Peru</Select.Option>
                </Select.OptGroup>
            </Select>
            <Select
                placeholder=""
                style={{
                    width: 180,
                    marginLeft: 20,
                }}
                filter
                defaultOpen
                value={value1}
                onChange={val => setValue1(val)}
            >
                <Select.Option value="a-1">China</Select.Option>
                <Select.Option value="a-2">Koera</Select.Option>
                <Select.Option value="b-1">Germany</Select.Option>
                <Select.Option value="b-2">France</Select.Option>
                <Select.Option value="c-1">Peru</Select.Option>
            </Select>
        </>
    );
};

stories.add(`Filter + defaultOpen`, () => <FilterDefaultOpen />); // const CustomSelect = React.forwardRef((props, ref) => {
//     const { fieldRef, ...rest } = props;
//     return <Select {...rest} ref={fieldRef} />
// });

const CustomSelect = props => {
    const { fieldRef, ...rest } = props;
    return <Select {...rest} ref={fieldRef} />;
};

const CustomFieldSelect = withField(CustomSelect);

const RefDemo = () => {
    const fieldRef = useRef(null);

    const onChange = () => {
        console.log(fieldRef);
        fieldRef.current.open();
        debugger;
    };

    return (
        <Form>
            <CustomFieldSelect field="test" initValue="se" fieldRef={fieldRef}></CustomFieldSelect>
            <Button onClick={onChange}>change</Button>
        </Form>
    );
};

stories.add('Ref field demo', () => <RefDemo />);

const ValueZeroDemo = () => {
    const list = [
        {
            value: 6,
            label: '抖音小视频',
            otherKey: 0,
        },
        {
            value: 1,
            label: '火山小视频',
            disabled: true,
            otherKey: 1,
        },
        {
            value: 'pipixia',
            label: '皮皮虾',
            otherKey: 2,
        },
        {
            value: 'toutiao',
            label: '今日头条',
            otherKey: 3,
        },
    ];
    return (
        <Select
            placeholder="请选择业务线"
            style={{
                width: 180,
            }}
            optionList={list}
            value={0}
            renderSelectedItem={option => option.label + 1}
        ></Select>
    );
};

stories.add('value=0', () => <ValueZeroDemo />);

const Highlight = () => {
    const searchWords = ['do', 'dollar'];
    const sourceString = 'aaa do dollar aaa';
    const result = getHighLightTextHTML({
        searchWords,
        sourceString,
    });
    const result2 = getHighLightTextHTML({
        searchWords: ['z'],
        sourceString: 'aaazaaazaaa',
    });
    return result2;
};

stories.add('highlight', () => <Highlight />);
