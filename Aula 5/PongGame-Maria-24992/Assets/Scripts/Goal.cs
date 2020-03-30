using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Goal : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision){
        if (collision.gameObject.CompareTag("ballTag")){ //when collide with the gameObject with the tag ballTag
            GameObject.Find("gameManagerObj").GetComponent<Manager>().Player1Scored(); //Call function to increment score in manger Class! 
        }
    }
}
