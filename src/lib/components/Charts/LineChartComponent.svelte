<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { defaultOptions } from './options';

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

	// why does merging have to be this complicated? Resolve
	const options = {
		...defaultOptions,
		chart: {
			...defaultOptions.chart,
			type: 'line',
			toolbar: {
				...defaultOptions.chart.toolbar,
				show: showToolbar
			}
		},
		series: series,
		xaxis: { ...defaultOptions.xaxis, ...xaxis },
		yaxis: { ...defaultOptions.yaxis, ...yaxis }
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
