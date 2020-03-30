using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class Manager : MonoBehaviour
{
    [Header("Ball")]
    public GameObject ball;

    [Header("Score UI")] //Criar titulo
    public GameObject player1text;

    private int playerScore;

    public void Player1Scored(){
        playerScore++; //Increment score
        player1text.GetComponent<TextMeshProUGUI>().text = playerScore.ToString(); // Update Score Text
        ball.GetComponent<Ball>().increaseSpeed(); //increment speed in class ball
    }

    public void Reset(){

        playerScore = 0;
        player1text.GetComponent<TextMeshProUGUI>().text = playerScore.ToString();
    }
}
