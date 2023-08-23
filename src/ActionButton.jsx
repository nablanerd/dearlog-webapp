
const ActionButton =   (props) => {

    const { text, callback } = props


    return (
<button onClick={callback}>{text}</button>
    );

};

export default ActionButton;