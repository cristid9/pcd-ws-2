package hello;

import beans.Event;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import scrappers.InOrasEventsScrapper;

import java.util.List;

@Controller
public class GreetingController {


//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }

    @MessageMapping("/helloWorld")
    @SendTo("/topic/scrappAll")
    public List<Event> scrappWS() throws Exception {
        Thread.sleep(1000);;
        return (new InOrasEventsScrapper()).scrappEvents();
    }

    @MessageMapping("/hello")
    @SendTo("/topic/scrapp")
    public String scrapp() throws Exception
    {
        Thread.sleep(1000);
        return "comanda procesata";
    }

}
