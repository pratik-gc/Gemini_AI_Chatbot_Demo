package com.ai.gemini_chat_demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;


@Service
public class QnAService {

    //Accessing the Gemini API Key and URL
    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    //WebClient uses WebFlux Dependency to talk to backend application
    private final WebClient webClient;

    public QnAService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    //Getting the data from Google Gemini
    public String getAnswer(String question) {

        //Example of request payload/format for Google Gemini :
                /*
                    {
                        "contents": [{
                            "parts":[{"text": "What are mutual funds?"}]
                         }]
                    }
                */

        //Constructing the request payload as per Google Gemini format
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of(
                                                "text", question
                                        )
                                }
                        )
                }
        );


        //Making the API call
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        //Returning the response
        return response;
    }
}
