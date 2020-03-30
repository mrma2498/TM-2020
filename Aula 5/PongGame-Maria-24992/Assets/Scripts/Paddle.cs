using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Paddle : MonoBehaviour
{
    public float speed; //Velocidade a que o jogador se movimenta de cima para baixo
    public Rigidbody2D rb;

    private Vector3 startPosition; //guarda a posição inicial

    private float movement;

    //função que corre sempre que inicializarmos um objecto com este script
    void Start(){
        
        startPosition = transform.position; //store first position

    }

    
    void Update(){

        //Access this Vertical Input in Edit > Input > Axes > Vertical

        movement = Input.GetAxisRaw("Vertical"); //default by Unity W and S keys and other propeties, Returns the value of the virtual axis, in range of -1..1
        rb.velocity = new Vector2(rb.velocity.x, movement * speed); //set velocity of paddle
    }

    public void Reset(){

        rb.velocity = Vector2.zero; //Reset velocity
        transform.position = startPosition; //Reset position initial one
    }
}
