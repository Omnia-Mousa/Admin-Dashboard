import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ProductCrudService } from '../../services/product-crud.service'
import { Product } from '../../models/product'
import { UserCrudService } from '../../services/user-crud.service'
import { User } from '../../models/user'
import { OrderCrudService } from '../../services/order-crud.service'
import { Order } from '../../models/order'


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  products : Product[] = [];
  users: User[] = []
  stores: User[] = []
  orders: Order[] = [];
  productLen: number = 0;
  pieChartData: number[] = [];
 pieChartLabels: Label[] = [];
 Labels: Label[] = ['Products', 'Users' , 'Stores' ,'Orders'];

  
  constructor(private productService:ProductCrudService,
              private userService:UserCrudService,
              private orderService:OrderCrudService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productLen = products.length
      this.pieChartData.push(this.products.length)
      this.pieChartLabels.push(this.Labels[0])
      this.userService.displayAllUsers()
      .subscribe((users: User[])=>{
        users.forEach(myuser => {
          if(myuser.Type == 'shop'){
            this.stores.push(myuser)
          }else if(myuser.Type == 'user')
          {
            this.users.push(myuser)
          }
        })
      this.pieChartData.push(this.users.length)
      this.pieChartLabels.push(this.Labels[1])
      this.pieChartData.push(this.stores.length)
      this.pieChartLabels.push(this.Labels[2])
       
      this.orderService.getAllOrders().subscribe((orders : Order[]) => {
        this.orders = orders
        this.pieChartData.push(this.orders.length)
        this.pieChartLabels.push(this.Labels[3])

      })
     
      })
    })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  // public pieChartLabels: Label[] = ['Products', 'Users' , 'Orders'];
 
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}
