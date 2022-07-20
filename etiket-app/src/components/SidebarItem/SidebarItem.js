import './SidebarItem.css';
import { Component } from 'react';

const pathIcons = '../images/icons/';

class SidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleIsOpen() {
    this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    // const isDisabled=this.state.isDisabled
    // const content=this.state.content
    // const alt=this.state.alt
    // const dataTip=this.state.dataTip
    // const icon=this.state.icon

    return (
      <div className={this.props.isDisabled ? 'sideBarItem sideBarItemDisabled' : 'sideBarItem'}>
        <div
          role="presentation"
          onClick={() => {
            this.handleIsOpen();
          }}>
          <img
            src={pathIcons + this.props.icon}
            alt={this.props.alt}
            data-tip={this.props.dataTip}
            className={this.props.isDisabled ? 'iconDisabled' : 'iconEnabled'}
          />
        </div>
        {isOpen && <div className="sideBarContent">{this.props.content}</div>}
      </div>
    );
  }
}

export default SidebarItem;
