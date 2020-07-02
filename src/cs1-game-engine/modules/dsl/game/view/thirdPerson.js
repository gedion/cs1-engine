//VIEW INITIALIZES ON GAME-START
//VIEW EXPECTS THE MYPLAYER AND MYPLAYER.AVATAR
import {simpleavatar} from '../../../ecs/simpleAvatar';
import { follow } from "../../../ecs/follow";

export const thirdPerson = {
  
  type: 'THIRD_PERSON',
  
  init: function(){
    
    console.log('Setting game as THIRD_PERSON.');
    CS1.myPlayer.setAttribute('wasd-controls','acceleration:30');
    
    
    const rigTarget = document.createElement('a-entity');
    rigTarget.object3D.position.set(0,0.5,3);
    rigTarget.setAttribute('id','rig-target');
    const rigTargetSwivel = document.createElement('a-entity');
    rigTargetSwivel.appendChild(rigTarget);
    CS1.myPlayer.appendChild(rigTargetSwivel);
    CS1.myPlayer.rigTargetSwivel = rigTargetSwivel;
    CS1.myPlayer.rigTarget = rigTarget;
    //CS1.myPlayer.cam = document.querySelector('[camera]');
    CS1.rig.setAttribute("follow", "target: #rig-target;");
    CS1.cam.setAttribute("look-controls", "pointerLockEnabled:true;");
    
    
    if(CS1.device=='Standard' || CS1.device=='Mobile') 
      CS1.myPlayer.components.player.tick = function(t,dt){
        CS1.myPlayer.object3D.rotation.y = CS1.cam.object3D.rotation.y;
      }
    if(CS1.device=='Oculus' && CS1.myPlayer.avatar && CS1.myPlayer.avatar.head) 
      CS1.myPlayer.components.player.tick = function(t,dt){
        CS1.myPlayer.avatar.head.object3D.rotation.y = CS1.cam.object3D.rotation.y;
      }

    console.log('view-ready')
    document.body.dispatchEvent( new Event('view-ready'))
    
  
    if(CS1.device=='Standard'){
      document.body.addEventListener('keyup', e=>{
        switch(e.code){
          case 'Digit1':
            CS1.game.view.toggle();
            break;
          case 'Digit2':
            break
        }
      })
    }
    
    
    
  
    
  },

  toggle: function(){
    if(!CS1.rig.components.follow)return
    if(CS1.myPlayer.rigTarget.object3D.position.z==3){
      CS1.myPlayer.rigTarget.object3D.position.set(0,0,1);
      CS1.rig.components.follow.data.yFactor = 1;
      CS1.rig.components.follow.data.strength = 0.1;
      CS1.myPlayer.avatar.object3D.traverse(o=>{
        if(o.type=='Mesh'){
         o.material.transparent = true
         o.material.opacity = 0.05
        }
      })
    }else{
      CS1.myPlayer.rigTarget.object3D.position.set(0,0.5,3);
      CS1.rig.components.follow.data.yFactor = 2;
      CS1.rig.components.follow.data.strength = 0.05;
      CS1.myPlayer.avatar.object3D.traverse(o=>{
        if(o.type=='Mesh'){
         o.material.transparent = false
         o.material.opacity = 1.0
        }
      })
    }
    
    
    
  },
  



}