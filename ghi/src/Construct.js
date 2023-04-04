function Construct(props) {

    const pad2 = num => String(num).padStart(2, '0');

    return (
        <div className="App">
            <header className="App-header">
                <h1>Aaron, Mike, Sitara, and Tahmid are awesome</h1>
                <h2>Coming by 4.30.23</h2>
                <h2>{props.info.year}-{pad2(props.info.month)}-{pad2(props.info.day)}</h2>
                <h2>by or <strong>WELL BEFORE</strong> {pad2(props.info.hour)}:{pad2(props.info.min)}</h2>
                
            </header>
        </div>
    )
}

export default Construct;