var rotate=360;
var Day=React.createClass({
    render:function(){
        return (
            <div className="day">
            <div className="info">{this.props.info}</div>
        <div className={"radius"+(this.props.isnow? " isnow":"")}>
            <div className="daynum" data-color={this.props.color} data-date={this.props.day.date} data-month={this.props.day.month} data-year={this.props.day.year}>{this.props.day.date}</div>
        <div className="yindaynum" title={monthhash[this.props.yindaynum.lunarMonth]+lunarhash[this.props.yindaynum.lunarDay]}>{this.props.yindaynum.lunarDay!=1?lunarhash[this.props.yindaynum.lunarDay]:monthhash[this.props.yindaynum.lunarMonth]}</div>
        </div>
        </div>)
    }
});
var Showhead=React.createClass({
    render:function(){
        return (
            <div id="showhead">
            <div className="day">日</div>
            <div className="day">一</div>
            <div className="day">二</div>
            <div className="day">三</div>
            <div className="day">四</div>
            <div className="day">五</div>
            <div className="day">六</div>
            </div>
        )
    }
})
var Showday=React.createClass({
    componentWillUpdate:function(){
//            $("div#showday").css("transform","translateX(-1000px)");
//            rotate+=360;
    },
    componentDidUpdate:function(){
//            $("div#showday").css("transform","translateX(0px)");
//            rotate+=360;
    },
//		componentDidMount:function(){
//			$('#showday').on('click','.radius',function(event){
//				var target=$(event.target);
//				var daynum=target.parents(".day").find(".daynum")
//				console.log(target.parents(".day").find(".daynum").attr("data-date"))
//			});
//		},

    clickHandle: function (event) {

    },
    render:function(){
        var converter = new LunarSolarConverter();
        var solar = new Solar();
        var lunar;
        var nowdate=new Date();
        var argYear=+this.props.year;
        var argMounth=+this.props.month;
        var argdate=+this.props.date;
        var thisdate=new Date(argYear,argMounth,1);
//			thisdate.setFullYear(argYear);
//			thisdate.setDate(1);
//			thisdate.setMonth(argMounth);
        thisdate.setDate(argdate);
        var lastdate=new Date(argYear,(argMounth-1),1);
//			lastdate.setFullYear(argYear);
//			lastdate.setDate(1);
//			lastdate.setMonth(argMounth-1);


        var nextdate=new Date(argYear,(argMounth+1),1);
//			nextdate.setFullYear(argYear);
//			nextdate.setDate(1);
//			nextdate.setMonth(argMounth+1);

        console.log(argMounth,thisdate,lastdate,nextdate)
        var index=0,date=new Date(argYear,argMounth,1);
//			date.setFullYear(argYear);
//			date.setDate(1);
//			date.setMonth(argMounth);
        date.setDate(index);
        var beginday=date.getDay();
        var html=[],data=[],t;
        var lastMonthindex=date.getDate();
        lastdate.setDate(lastMonthindex);
        console.log(lastMonthindex,beginday)
        for(var i=beginday;i>=0;i--){
            solar.solarYear=lastdate.getFullYear();
            solar.solarMonth=lastdate.getMonth()+1;
            solar.solarDay=lastdate.getDate();

            lunar=converter.SolarToLunar(solar);

            html.unshift(<Day color="gray" day={{year:solar.solarYear,month:solar.solarMonth-1,date:solar.solarDay}} yindaynum={lunar}></Day>);
            lastMonthindex--;
            lastdate.setDate(lastMonthindex);
            //console.log(index,date)
        }
        date=new Date(argYear,argMounth,1);
//			date.setFullYear(argYear);
//			date.setDate(1);
//			date.setMonth(argMounth);


        index=1;

        var nextMonthindex=1;
        nextdate.setDate(nextMonthindex);
        for(var i=0;i<42-beginday-1;i++){
            // console.log(date,date.getMonth(),argMounth)
            if(date.getMonth()==argMounth){
                solar.solarYear=date.getFullYear();
                solar.solarMonth=date.getMonth()+1;
                solar.solarDay=date.getDate();
                lunar=converter.SolarToLunar(solar);

                if(nowdate.getFullYear()==date.getFullYear()&&nowdate.getMonth()==date.getMonth()&&nowdate.getDate()==date.getDate()){

                    html.push(<Day day={{year:solar.solarYear,month:solar.solarMonth-1,date:solar.solarDay}}  yindaynum={lunar} isnow="1"></Day>);
                }else{
                    html.push(<Day day={{year:solar.solarYear,month:solar.solarMonth-1,date:solar.solarDay}}  yindaynum={lunar}></Day>);
                }

                index++;
                date.setDate(index);
            }else{
                solar.solarYear=nextdate.getFullYear();
                solar.solarMonth=nextdate.getMonth()+1;
                solar.solarDay=nextdate.getDate();
                lunar=converter.SolarToLunar(solar);
                html.push(<Day color="gray" day={{year:solar.solarYear,month:solar.solarMonth-1,date:solar.solarDay}}  yindaynum={lunar}></Day>);
                nextMonthindex++;
                nextdate.setDate(nextMonthindex)
            }


        }

        while (html.length!=0){
            data.push(html.splice(0,7))
        }
        t=data.map(function(item,index){
            return <div className="showitem">{item}</div>
        })

        return (
            <div id="showday">
            <Showhead></Showhead>
            <div id="showbody" onClick={this.clickHandle}>
        {t}
        </div>
        </div>

        )

    }
});
var Datehead=React.createClass({
    componentDidMount: function () {
//            console.log(this.props.month)
        $("#selyear").find("[value="+this.props.year+"]").attr("selected","true");
        $("#selmonth").find("[value="+(this.props.month)+"]").attr("selected","true");
        var years=[],months=[];
        for(var i=1900;i<2050;i++){
            years.push("<li data-value="+i+">"+i+"年</li>")
        }
        for(var i=0;i<12;i++){
            months.push("<li data-value="+i+">"+(i+1)+"月</li>")
        }

        $("#selyear ul").html(years.join(""));
        $("#selmonth ul").html(months.join(""));

    },
    componentDidUpdate:function(){
//		$("option").removeAttr("selected");;
        //$("#selmonth").find("[value="+this.props.month+"]").attr("selected","true");
        console.log(this.props.year)
        $("#selyear").find("option[value="+this.props.year+"]").attr("selected","true");
        $("#selmonth").find("option[value="+(this.props.month)+"]").attr("selected","true");
    },
    getlunar:function(){
        var converter = new LunarSolarConverter();
        var solar = new Solar();
        var lunar,result="";
        solar.solarYear=this.props.year;
        solar.solarMonth=this.props.month+1;
        solar.solarDay=this.props.date;
        lunar=converter.SolarToLunar(solar);
        $(".cindex").removeClass("cindex");
        result=getYearName(lunar.lunarYear)+monthhash[lunar.lunarMonth]+lunarhash[lunar.lunarDay];
        return result;
    },
    render:function(){


        return (<div id="datehead">
            <div className="left">
            <div id="selyear">
            <span className="sel">{this.props.year}年</span><span className="minbuttom" onClick={this.props.showlistHandle}>∨</span>
        <div className="ul">
            <ul onClick={this.props.changeHander}>
        </ul>
        </div>
        </div>
        <div id="selmonth">
            <span className="sel">{this.props.month+1}月</span><span className="minbuttom" onClick={this.props.showlistHandle}>∨</span>
        <div className="ul">
            <ul onClick={this.props.changeHander}>
        </ul>
        </div>
        </div>

        </div>
        <div className="right Lunarinfo">{this.getlunar()}</div>
        </div>)
    }
});
var Datelist=React.createClass({
    render:function(){
        return (<div id="datelist">
            <div className="left"></div>
            <div className="right buttom" onClick={this.props.turnnowHandle}>今天</div>

        </div>)
    }
})
var Turnleft=React.createClass({
    render:function(){
        return(
            <div id="turnleft" onClick={this.props.turnLorRHandle}>&lt;</div>
        )
    }
});
var Turnright=React.createClass({
    render:function(){
        return(
            <div id="turnright"  onClick={this.props.turnLorRHandle}>&gt;</div>
        )
    }
});
var Main=React.createClass({
    getInitialState:function(){
        var date=new Date();

        return {
            year:date.getFullYear(),
            month:date.getMonth(),
            date:date.getDate(),

        }
    },
    componentDidUpdate:function(){
        console.log(this.state)
        $("[data-date="+this.state.date+"][data-month="+(this.state.month)+"]").parents(".radius").addClass("cindex");
    },
    componentDidMount:function(){
        var that=this;

        $('#showday').on('click','.radius',function(event){
            var target=$(event.target);
            $(".cindex").removeClass("cindex");
            var daynum=target.parents(".day").find(".daynum");
            var year=+daynum.attr("data-year"),month=+daynum.attr("data-month"),date=+daynum.attr("data-date");
            console.log($("[data-date="+date+"][data-month="+month+"]").parents(".radius"))
            //$("[data-date="+date+"][data-month="+(month+1)+"]").parents(".radius").addClass("cindex");
            //target.parents(".day").find("div[data-date="+date+"][data-month="+month+"]").parents(".radius").addClass("cindex");

            that.setState({
                year:year,
                month:month,
                date:date,

            })

        });
    },
    changeHander:function(event){
        var target=$(event.target);
        if(event.target.nodeName=="LI"){
            var parent= target.parent().parent().parent();
            var year=this.state.year,month=this.state.month;
            if(parent.attr("id")=="selyear"){
                year=+target.attr("data-value");

            }else if(parent.attr("id")=="selmonth"){

                month=+target.attr("data-value");

            }
            target.parent().parent().hide();
            console.log(year,month)
            this.setState({
                year:year,
                month:month,
                date:1,

            })
        }


    },
    turnnowHandle:function(){
        var date=new Date();
        this.setState({
            year:date.getFullYear(),
            month:date.getMonth(),
            date:date.getDate(),


        })
    },
    turnLorRHandle: function (event) {

        var target=$(event.target);
        console.log(target.hasClass("turnleft"));
        if(target.attr("id")=="turnleft"){

            var date=new Date(this.state.year,this.state.month,1);
            date.setMonth(this.state.month-1);
            this.setState({
                year:date.getFullYear(),
                month:date.getMonth(),
                date:1

            })
        }else if(target.attr("id")=="turnright"){
            var date=new Date(this.state.year,this.state.month,1);
            date.setMonth(this.state.month+1);
            this.setState({
                year:date.getFullYear(),
                month:date.getMonth(),
                date:1,

            })
        }
    },
    showlistHandle:function(event){
        var target=$(event.target);
        var that=this;
        var parent= target.parent();
//            console.log($("#selyear li[data-value="+this.state.year+"]"))
        $("li").removeAttr("style");
        $("#selyear li[data-value="+this.state.year+"]").css("background-color","#ccc")
        $("#selmonth li[data-value="+this.state.month+"]").css("background-color","#ccc")

        parent.find(".ul").toggle( function () {
            if(parent.attr("id")=="selyear"){

                parent.find("ul").scrollTop((+that.state.year-1900)*25)
            }else if(parent.attr("id")=="selmonth"){

                parent.find("ul").scrollTop((+that.state.month)*25)

            }

        });

    },
    render:function(){

        return (
            <div id="show">
            <Datehead year={this.state.year} month={this.state.month} date={this.state.date} changeHander={this.changeHander} showlistHandle={this.showlistHandle}></Datehead>
        <Datelist turnnowHandle={this.turnnowHandle}></Datelist>

        <Showday year={this.state.year} month={this.state.month} date={this.state.date}  ></Showday>
        <Turnleft  turnLorRHandle={this.turnLorRHandle}></Turnleft>
        <Turnright turnLorRHandle={this.turnLorRHandle}></Turnright>
        </div>
        )
    }

});

ReactDOM.render(
<Main />,
    document.getElementById("container")
)