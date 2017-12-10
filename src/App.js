import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'


class Step1 extends Component {
  render() {
    return <h1>Step 1 and filler text</h1>
  }
}


class Step2 extends Component {
  render() {
    return <h1>Step 2 and filler text</h1>
  }
}


class Step3 extends Component {
  render() {
    return <h1>Step 3 and filler text</h1>
  }
}

const Slide = ({ children, ...props }) => (
  <CSSTransition {...props}>
    {children}
  </CSSTransition>
)


class MultiStepper extends Component {
  constructor(props) {
    super(props)
    this.slideTransitionClassNames = {
      next: { enter: 'enter-from-right', enterActive: 'enter', exit: 'exit', exitActive: 'exit-to-left-active' },
      previous: { enter: 'enter-from-left', enterActive: 'enter', exit: 'exit', exitActive: 'exit-to-right-active' },
    }
    this.currentTransitionClassNames = this.slideTransitionClassNames.next
    this.itemsLen = this.props.children.length
    this.state = { activeIndex: 0, open: true }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      open: !this.state.open
    })
  }

  isFirst() {
    return this.state.activeIndex === 0
  }

  isLast() {
    return this.state.activeIndex === this.itemsLen - 1
  }

  next() {
    const nextIndex =
      this.state.activeIndex === this.itemsLen - 1
        ? this.state.activeIndex
        : this.state.activeIndex + 1
    this.currentTransitionClassNames = this.slideTransitionClassNames.next
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    const nextIndex =
      this.state.activeIndex === 0 ? 0 : this.state.activeIndex - 1
    this.currentTransitionClassNames = this.slideTransitionClassNames.previous
    this.setState({ activeIndex: nextIndex })
  }

  nextButton() {
    if (this.isLast()) {
      return this.saveButton()
    }

    return (
      <Button color="primary" onClick={this.next}>
        Next
      </Button>
    )
  }

  saveButton() {
    return (
      <Button color="primary" onClick={this.save}>
        Save
      </Button>
    )
  }

  prevButton() {
    return (
      <Button color="primary" onClick={this.previous}>
        Prev
      </Button>
    )
  }

  static childFactoryCreator = (classNames) => (
    (child) => (
      React.cloneElement(child, {
        classNames
      })
    )
  )

  render() {
    const { activeIndex } = this.state
    const item = this.props.children[activeIndex]
    return <div>
        <Modal isOpen={this.state.open} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <TransitionGroup className='slide-container' childFactory={MultiStepper.childFactoryCreator(this.currentTransitionClassNames)}>
              <Slide key={activeIndex} timeout={500} classNames={this.currentTransitionClassNames}>
                <div className='slide-content'>
                  {item}
                </div>
              </Slide>
            </TransitionGroup>
          </ModalBody>
          <ModalFooter>
            {this.prevButton()}
            {this.nextButton()}
          </ModalFooter>
        </Modal>
      </div>
  }
}


class App extends Component {
  render() {
    return (
      <MultiStepper>
        <Step1 />
        <Step2 />
        <Step3 />
      </MultiStepper>
    )
  }
}

export default App
