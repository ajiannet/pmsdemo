var app = (function ($) {
    var initData = function () {
        var currentProject = {}, projectTypes = [];
        for (var index in projects) {
            var item = projects[index];
            item.type.id = item.id;
            if (item.type.active) {
                currentProject = item;
            }
            projectTypes.push(item.type);
        }
        $('.project-type table tr').empty().append(
           $('#project-type-tmpl').tmpl(projectTypes, {
               getActiveCss: function () {
                   return this.data.active ? 'active' : '';
               }
           }));

        loadData(currentProject);
        initEvent();
    };

    var initEvent = function () {
        $('.project-type-td').on('click', '.project-type-item', function () {
            var $this = $(this), currentProject = {};
            $this.closest('tr').find('td').removeClass('active');
            $this.parent().addClass('active');
            currentProject = projects.filter(function (item) {
                return item.id == $this.attr('data-project-type');
            })[0];

            loadData(currentProject);
        });
    };

    var loadData = function (project) {
        $('.project-total').empty().append($('#project-total-tmpl').tmpl(project.total));

        initChart(project.chart);

        $('.project-grid #project-data').empty().append($('#project-grid-tmpl').tmpl(project.data, {
            getPercentCss: function () {
                return this.data.percent >= 40 ? "red" : "green";
            }
        }));
    };

    var initChart = function (data) {
        var myChart = echarts.init(document.getElementById("e_charts"));
        var myChartOption = {
            //title: {
            //    text: '完成比率',
            //    textStyle:{
            //        color: '#222222',
            //        fontSize: '15px',
            //        fontFamily: 'Microsoft YaHei'
            //    }
            //},
            grid: {
                left: '10%',
                right: '10%',
                top: '5%',
                bottom: '20%'
            },
            xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月'],
                axisTick: { show: false },
                axisLine: { show: false }
            },
            yAxis: {
                axisLine: { show: false },
                axisTick: { show: false },
                //min: 10,
                axisLabel: { formatter: '{value}%' },
                splitNumber: 3
            },
            animationDurationUpdate: 1200,
            series: [{
                type: 'bar',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: '#008FCE'
                    }
                },
                data: data
            }]
        };
        myChart.setOption(myChartOption);
    };

    return {
        init: initData
    };
})(jQuery);