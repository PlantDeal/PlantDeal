import React, { useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';



function AverageScreen({navigation}: any) {
    const Width = Dimensions.get('window').width;
    const[day,setDay] = useState('#16D66F')
    const[dayword,setDayword] = useState('#FFFFFF')
    const[week,setWeek] = useState('#FFFFFF')
    const[weekword,setweekword] = useState('#8E8E93')
    const[month,setMonth] = useState('#FFFFFF')
    const[monthword,setMonthword] = useState('#8E8E93')
    const[year,setYear] = useState('#FFFFFF')
    const[yearword,setYearword] = useState('#8E8E93')
    const[aver,setAver] = useState('day')

    const time = new Date();
    const tmpYear = time.getFullYear();
    const tmpMonth = time.getMonth() + 1;
    const tmpDay = time.getDate();

    function Showday(){
        setDay('#16D66F')
        setDayword('#FFFFFF')
        setWeek('#FFFFFF')
        setweekword('#8E8E93')
        setMonth('#FFFFFF')
        setMonthword('#8E8E93')
        setYear('#FFFFFF')
        setYearword('#8E8E93')
        setAver('day')
    }

    function Showweek(){
        setDay('#FFFFFF')
        setDayword('#8E8E93')
        setWeek('#16D66F')
        setweekword('#FFFFFF')
        setMonth('#FFFFFF')
        setMonthword('#8E8E93')
        setYear('#FFFFFF')
        setYearword('#8E8E93')
        setAver('week')
    }

    function Showmonth(){
        setDay('#FFFFFF')
        setDayword('#8E8E93')
        setWeek('#FFFFFF')
        setweekword('#8E8E93')
        setMonth('#16D66F')
        setMonthword('#FFFFFF')
        setYear('#FFFFFF')
        setYearword('#8E8E93')
        setAver('month')
    }

    function Showyear(){
        setDay('#FFFFFF')
        setDayword('#8E8E93')
        setWeek('#FFFFFF')
        setweekword('#8E8E93')
        setMonth('#FFFFFF')
        setMonthword('#8E8E93')
        setYear('#16D66F')
        setYearword('#FFFFFF')
        setAver('year')
    }

    function ShowAver(){
        if(aver === 'day'){
            return(
                <View style={{width:Width,height:204,backgroundColor:'#F4F4F4',marginTop:9}}>
                    <View style={{width:Width,height:30}}>

                    </View>
                    <View style={{width:Width,height:134,flexDirection:'row'}}>
                        <View style={{flex:2,height:134,alignItems:'center'}}>
                            <View style={{height:134,justifyContent:'space-between'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#8E8E93'}}>100,000</Text>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#8E8E93'}}>50,000</Text>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#8E8E93'}}>10,000</Text>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#8E8E93'}}>5,000</Text>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#8E8E93'}}>0</Text>
                            </View>
                        </View>
                        <View style={{flex:8.5,height:134,flexDirection:'row'}}>
                            <View style={{height:134,flex:1,alignItems:'flex-start'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                            <View style={{height:134,flex:1,alignItems:'flex-start',backgroundColor:'#F4F4F4'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                            <View style={{height:134,flex:1,alignItems:'flex-start'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                            <View style={{height:134,flex:1,alignItems:'flex-start'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                            <View style={{height:134,flex:1,alignItems:'flex-start'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                            <View style={{height:134,flex:1,alignItems:'flex-start'}}>
                                <View style={{height:134,width:16,backgroundColor:'#00873E',borderRadius:999,shadowColor:'#C6C6C6',shadowOpacity:0.68,shadowOffset:{width:-8,height:5}}}></View>
                            </View>
                        </View>
                    </View>
                    <View style={{width:Width,height:40,flexDirection:'row'}}>
                        <View style={{flex:2,height:40}}>

                        </View>
                        <View style={{flex:8.5,height:40,flexDirection:'row'}}>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay-5}일</Text>
                            </View>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay-4}일</Text>
                            </View>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay-3}일</Text>
                            </View>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay-2}일</Text>
                            </View>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay-1}일</Text>
                            </View>
                            <View style={{height:40,flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{fontSize: 10,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color:'#48484A'}}>{tmpDay}일</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        else if(aver === 'week'){
            return(
                <View style={{width:Width,height:204,backgroundColor:'#F4F4F4',marginTop:9}}>
                    <View style={{width:Width,height:30,backgroundColor:'red'}}>

                    </View>
                    <View style={{width:Width,height:134,backgroundColor:'#FFFFFF'}}>
                        <View>
                            <Text>100,000</Text>
                            <Text>50,000</Text>
                            <Text>10,000</Text>
                            <Text>5,000</Text>
                            <Text>0</Text>
                        </View>
                    </View>
                    <View style={{width:Width,height:40,backgroundColor:'red'}}>

                    </View>
                </View>
            );
        }
        else if(aver === 'month'){
            return(
                <View style={{width:Width,height:204,backgroundColor:'#F4F4F4',marginTop:9}}>
                    <View style={{width:Width,height:30,backgroundColor:'blue'}}>

                    </View>
                    <View style={{width:Width,height:134,backgroundColor:'#FFFFFF'}}>

                    </View>
                    <View style={{width:Width,height:40,backgroundColor:'blue'}}>

                    </View>
                </View>
            );
        }
        else{
            return(
                <View style={{width:Width,height:204,backgroundColor:'#F4F4F4',marginTop:9}}>
                    <View style={{width:Width,height:30,backgroundColor:'grey'}}>

                    </View>
                    <View style={{width:Width,height:134,backgroundColor:'#FFFFFF'}}>

                    </View>
                    <View style={{width:Width,height:40,backgroundColor:'grey'}}>

                    </View>
                </View>
            );
        }
    }



  

  return (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={{width:335,marginBottom:9}}>
            <Text style={{fontSize: 18,fontFamily: 'NotoSansKR-Bold',includeFontPadding: false,color: '#000000',marginBottom:7}}>시세</Text>
            <View style={{height:52,width:335,backgroundColor:'#F4F4F4',alignItems:'center',justifyContent:'center',marginTop:7}}>
                <View style={{width:315,flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={Showday} style={{width:65,height:32,backgroundColor:day, alignItems:'center',justifyContent:'center',borderRadius:6}}>
                        <Text style={{fontSize: 12,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color: dayword}}>1일</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Showweek} style={{width:65,height:32,backgroundColor:week, alignItems:'center',justifyContent:'center',borderRadius:6}}>
                        <Text style={{fontSize: 12,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color: weekword}}>1주일</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Showmonth} style={{width:65,height:32,backgroundColor:month, alignItems:'center',justifyContent:'center',borderRadius:6}}>
                        <Text style={{fontSize: 12,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color: monthword}}>1개일</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Showyear} style={{width:65,height:32,backgroundColor:year, alignItems:'center',justifyContent:'center',borderRadius:6}}>
                        <Text style={{fontSize: 12,fontFamily: 'NotoSansKR-Regular',includeFontPadding: false,color: yearword}}>1년</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <ShowAver/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },


  
});

export default AverageScreen;

