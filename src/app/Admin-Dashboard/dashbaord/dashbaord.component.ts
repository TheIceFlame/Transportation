import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {DashboardService} from '../../services/dashboard.service';
interface TopMerchant {
  merchantId: number;
  orderCount: number;
}

interface DashboardStats {
  totalOrders: number;
  totalPendingOrders: number;
  totalConfirmedOrders: number;
  totalScheduledOrders: number;
  totalCanceledOrders: number;
  topMerchants: TopMerchant[];
}
Chart.register(...registerables);
@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss'
})
export class DashbaordComponent {
  orderData: any = {
    totalOrders: 0,
    totalPendingOrders: 0,
    totalConfirmedOrders: 0,
    totalScheduledOrders: 0,
    totalCanceledOrders: 0,
    topMerchants: []
  };

  completionRate: number = 0;
  pendingRate: number = 0;
  activeMerchants: number = 0;
  isLoading: boolean = true;

  private statusChart: Chart | undefined;
  private merchantChart: Chart | undefined;

  constructor(private service: DashboardService) { } // Replace 'any' with your actual service type

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // Charts will be created after data is loaded
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      this.orderData = await this.service.get_data();
      this.calculateSummary();

      // Wait for view to update, then create charts
      setTimeout(() => {
        this.createStatusChart();
        this.createMerchantChart();
        this.isLoading = false;
      }, 100);
    } catch (error) {
      console.error('Error loading data:', error);
      this.isLoading = false;
    }
  }

  private calculateSummary(): void {
    if (!this.orderData) return;

    this.completionRate = this.orderData.totalOrders > 0
      ? Math.round(((this.orderData.totalConfirmedOrders + this.orderData.totalScheduledOrders) / this.orderData.totalOrders) * 100)
      : 0;

    this.pendingRate = this.orderData.totalOrders > 0
      ? Math.round((this.orderData.totalPendingOrders / this.orderData.totalOrders) * 100)
      : 0;

    this.activeMerchants = this.orderData.topMerchants ? this.orderData.topMerchants.length : 0;
  }

  // Method to refresh data
  public refreshData(): void {
    this.loadData();
  }

  private createStatusChart(): void {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (!ctx || !this.orderData) return;

    // Destroy existing chart if it exists
    if (this.statusChart) {
      this.statusChart.destroy();
    }

    const statusData:any[]  = [];
    const statusLabels:any[] = [];
    const statusColors:any[]  = [];

    if (this.orderData.totalPendingOrders > 0) {
      statusData.push(this.orderData.totalPendingOrders);
      statusLabels.push('Pending');
      statusColors.push('#fbbf24');
    }
    if (this.orderData.totalConfirmedOrders > 0) {
      statusData.push(this.orderData.totalConfirmedOrders);
      statusLabels.push('Confirmed');
      statusColors.push('#10b981');
    }
    if (this.orderData.totalScheduledOrders > 0) {
      statusData.push(this.orderData.totalScheduledOrders);
      statusLabels.push('Scheduled');
      statusColors.push('#667eea');
    }
    if (this.orderData.totalCanceledOrders > 0) {
      statusData.push(this.orderData.totalCanceledOrders);
      statusLabels.push('Canceled');
      statusColors.push('#ef4444');
    }

    // Only create chart if there's data
    if (statusData.length === 0) {
      statusData.push(1);
      statusLabels.push('No Data');
      statusColors.push('#e5e7eb');
    }

    this.statusChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: statusLabels,
        datasets: [{
          data: statusData,
          backgroundColor: statusColors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverBorderWidth: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                if (statusLabels[0] === 'No Data') return 'No orders available';
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  private createMerchantChart(): void {
    const ctx = document.getElementById('merchantChart') as HTMLCanvasElement;
    if (!ctx || !this.orderData || !this.orderData.topMerchants) return;

    // Destroy existing chart if it exists
    if (this.merchantChart) {
      this.merchantChart.destroy();
    }

    let merchantLabels: string[] = [];
    let merchantData: number[] = [];

    if (this.orderData.topMerchants.length > 0) {
      merchantLabels = this.orderData.topMerchants.map((m: any) => `Merchant ${m.merchantId}`);
      merchantData = this.orderData.topMerchants.map((m: any) => m.orderCount);
    } else {
      merchantLabels = ['No Data'];
      merchantData = [0];
    }

    this.merchantChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: merchantLabels,
        datasets: [{
          label: 'Orders',
          data: merchantData,
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                size: 12
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusChart) {
      this.statusChart.destroy();
    }
    if (this.merchantChart) {
      this.merchantChart.destroy();
    }
  }
}
