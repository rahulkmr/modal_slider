import React, { Component } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
import logo from './logo.svg'
import './App.css'

const step1 = () => <h1>Step 1</h1>
const step2 = () => <h2>Step 2</h2>
const step3 = () => <h3>Step 3</h3>


const items = [
  {
    id: 1,
    src: step1,
    caption: 'Caption 1',
    captionHeader: 'Caption header 1',
  },
  {
    id: 2,
    src: step2,
    caption: 'Caption 2',
    captionHeader: 'Caption header 2',
  },
  {
    id: 3,
    src: step2,
    caption: 'Caption 3',
    captionHeader: 'Caption header 3',
  }
]

class MultiStepForm extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === items.length - 1 ? this.state.activeIndex : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? 0 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
          src={item.src}
        >
          <CarouselCaption captionText={item.caption} captionHeader={item.captionHeader} />
        </CarouselItem>
      )
    })

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    )
  }
}

class App extends Component {
  render() {
    return (
      <MultiStepForm />
    )
  }
}

export default App
