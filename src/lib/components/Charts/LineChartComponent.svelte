<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const {
		series,
		yaxis,
		xaxis,
		showToolbar = true,
		class: className
	} = $props<{
		series: ApexAxisChartSeries;
		xaxis?: ApexXAxis;
		yaxis?: ApexYAxis;
		showToolbar?: boolean;
		class?: string;
	}>();

	let chartElement: HTMLDivElement;
	let chart: ApexCharts | undefined = $state(undefined);

	const options = {
		chart: {
			type: 'line',
			toolbar: {
				show: showToolbar,
				tools: {
					download: false,
					selection: true,
					zoom: true,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: true
				}
			}
		},
		series: series,
		xaxis: xaxis,
		yaxis: yaxis
	};

	onMount(async () => {
		if (browser && window) {
			const ApexCharts = (await import('apexcharts')).default;
			chart = new ApexCharts(chartElement, options);
			chart.render();
		}

		return () => {
			if (chart) {
				chart.destroy();
			}
		};
	});
</script>

{#if browser}
	<div bind:this={chartElement} class="h-full w-full {className}"></div>
{/if}
