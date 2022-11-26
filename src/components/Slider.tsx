import { useEffect, useState } from "react"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

type Image = {
    data: {
        image: string;
    }[]
}

const Slider = (props: Image) => {
    const [slide, setSlide] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const images = Object.values(props.data)

    let timeOut: any = null

    const slideLeft = () => {
        if (slide === 0) {
            setSlide(props.data.length - 1)
        } else {
            setSlide(slide - 1)
        }
    }

    const slideRight = () => {
        if (slide === props.data.length - 1) {
            setSlide(0)
        } else {
            setSlide(slide + 1)
        }
    }

    useEffect(() => {
        timeOut = autoplay && setTimeout(() => {
            slideRight()
        }, 2500)
    })

    return (
        <div className="slider"
            onMouseEnter={() => {
                setAutoplay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoplay(true)
            }}>
            <div className="container">
                {images.map((data, index) => (
                    <div key={index} className={index === slide ? "item slide-active" : "item"}>
                        <img src={data.image} alt="" className="image" />
                        <div className="overlay"></div>
                    </div>
                ))}
                <div className="arrow-left" onClick={slideLeft}><BsFillArrowLeftCircleFill /></div>
                <div className="arrow-right" onClick={slideRight}><BsFillArrowRightCircleFill /></div>
                <div className="pagination">
                    {images.map((_, index) => (
                        <div key={index} className={index == slide ? "index current-index" : "index"} onClick={() => setSlide(index)}></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider