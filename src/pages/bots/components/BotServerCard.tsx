import { IonButton, IonCard, IonCheckbox, IonGrid,  IonText } from '@ionic/react';
import { IonRow, IonCol } from '@ionic/react';
import { Dispatch, memo, SetStateAction, useEffect,useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import discordImage from '../../../images/discord.png';
import twitterImage from '../../../images/twitter.png';
import MagicEdenImage from '../../../images/me-black.png';
import { selcetServer } from '../Seamless';
type props = {  
    serverData: any
    multipleflag?:boolean
    setSelectMultipleWhiteList?:Dispatch<SetStateAction<selcetServer[]>>
    selectMultipleWhiteList?:selcetServer[]
    classes?:string
}

const BotServerCard: React.FC<props> = (props) => {

    let { serverData,multipleflag,setSelectMultipleWhiteList,selectMultipleWhiteList,classes } = props;
    let history = useHistory();
    const { serverId } = useParams<any>();
    const path:any = useLocation();
    const [initiateButton, setInitiateButton] = useState<boolean>(false)
    const [showMore, setShowMore] = useState<boolean>(false);

    let str = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
   
    useEffect(() => {
        let pathSlice = path.pathname.slice(1, 15)
        if(pathSlice === 'seamlessdetail'){
            setInitiateButton(false)
        }else{
            setInitiateButton(true)
        }
    }, [path])

    return (
        <IonCard className={`ion-no-margin multipleWhite-light-card seamlessCardWrapper ${classes&&classes}` } >
            <div className="cardImage relative">

                {/* image */}
                <img src={serverData?.image} className={serverData?.image ? 'cardMainImage' : 'cardNoImage'}
                alt='' 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.style.opacity='0'
                 }} />
                 <div className="socialMediaIcon flex items-center justify-center mt-2 absolute top-1 right-2">
                        {/*discord*/}
                        <div className='inviteIconWrapper' hidden={!serverData?.discord_link}>
                        <img  src={discordImage} className='cursor-pointer h-4' onClick={(event)=>{
                            event.stopPropagation();
                            if(serverData?.discord_link){ window.open(serverData?.discord_link) }}} />
                            </div>
                        {/*twitter*/}
                        <div className='inviteIconWrapper' hidden={!serverData?.twitter_link}>
                        <img  src={twitterImage} className='cursor-pointer h-4' onClick={(event)=>{
                            event.stopPropagation();
                            if(serverData?.twitter_link){ window.open(serverData?.twitter_link) }}} />
                            </div>
                        {/* magic eden  */}
                        <div className='inviteIconWrapper' hidden={!serverData?.magiceden_link}>
                        <img  src={MagicEdenImage} className='cursor-pointer h-4' onClick={(event)=>{
                            event.stopPropagation();
                            if(serverData?.magiceden_link){ window.open(serverData?.magiceden_link) }}} />
                            </div>
                    </div>
                    <div className='absolute mt-2 absolute top-2 left-3'>
                    {multipleflag && <IonCheckbox  className='checkboxWrapper' onIonChange={e => {
                        if(e.detail.checked){
                            setSelectMultipleWhiteList&&setSelectMultipleWhiteList((old)=>[...old,{id:serverData.id,name:serverData.name,discordGuildId:serverData.discordGuildId}])
                        }else{
                            setSelectMultipleWhiteList&&setSelectMultipleWhiteList(old=>old.filter(data=>data.id!==serverData.id))
                        }
                    }} />}
                    </div>

                <div className="cardOverlay-content py-1 px-4">

                    <div className='text-lg font-bold'>{serverData?.name}</div>

                    
                </div>
            </div>

            <IonGrid className="py-4 px-4">

                {initiateButton &&
                    <IonRow>
                        <IonCol size="12">
                            <IonButton className="cardButton w-full" onClick={(event) => {
                                event.stopPropagation()
                                history.push({pathname:`/seamlessdetail/${serverId}`,state:serverData})} }>
                                Initiate Seamless
                            </IonButton>
                        </IonCol>
                    </IonRow>
                }

                <p  className='card-detail-wrapper'>{serverData?.description}</p>

                <IonRow hidden={!serverData?.twitter_followers}>
                    <IonCol size="8">
                        <IonText className='card-detail-wrapper'>Twitter Followers</IonText>
                    </IonCol>
                    <IonCol size="4" className="ion-text-end">
                        <IonText className="greenText">{serverData?.twitter_followers || 0 } </IonText>
                    </IonCol>
                </IonRow>

                <IonRow hidden={!serverData?.twitter_interactions}>
                    <IonCol size="8">
                        <IonText className='card-detail-wrapper'>Twitter Interaction</IonText>
                    </IonCol>
                    <IonCol size="4" className="ion-text-end">
                        <IonText className="BlueText">{serverData?.twitter_interactions || 0}</IonText>
                    </IonCol>
                </IonRow>
                <div className="content-extra-space"></div>

                <IonRow hidden={!serverData?.discord_members}>
                    <IonCol size="8">
                        <IonText className='card-detail-wrapper'>Discord Members</IonText>
                    </IonCol>
                    <IonCol size="4" className="ion-text-end">
                        <IonText className="greenText">{serverData?.discord_members || 0}</IonText>
                    </IonCol>
                </IonRow>

                <IonRow hidden={!serverData?.discord_online}>
                    <IonCol size="8">
                        <IonText className='card-detail-wrapper'>Online</IonText>
                    </IonCol>
                    <IonCol size="4" className="ion-text-end">
                        <IonText className="BlueText">{serverData?.discord_online || 0}</IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>

        </IonCard>
    );
};

export default memo(BotServerCard)
