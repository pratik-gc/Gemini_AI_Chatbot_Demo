const ChatResponse = ({ response }) => {
    // If response is null, return null
    if(!response){
        return null;
    }

    // Destructuring the response object into 2 things : candidates and usageMetadata
    const {candidates, usageMetadata} = response;



    return (
        <div className="container my-4">
            <h3> Response </h3>
            {/* If response exists, display the response */}
            {candidates.map((candidate, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                    <h5 className="card-title">Candidate {index +1}</h5>
                    <p className="card-text">{candidate.content.parts[0].text}</p>
                   <h6>Citations : </h6>
                    <ul>
                        {candidate?.citationMetadata?.citationSources.map((source, idx) => (
                            <li key={idx}>
                                <a href={source.url} target="_blank">
                                    {source.url}
                                </a> {" "}
                                {/* (Indexes : {source.startIndex} - {source.endIndex}) */}
                            </li>
                        ))} 
                    </ul> 
                </div>
            </div>
            ))}

        </div>
    )
}

export default ChatResponse;