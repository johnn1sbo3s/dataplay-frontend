<template>
  <div class="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:bg-white/10 transition-all duration-300">
    <div class="flex justify-between items-start">
      <div class="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-transparent text-primary">
        <span class="material-symbols-outlined">
          account_balance_wallet
        </span>
      </div>
      <span class="flex items-center text-xs font-bold text-[#078816] bg-[#078816]/10 px-2 py-1 rounded-lg">
        <span class="material-symbols-outlined text-[14px] mr-1">
          trending_up
        </span>
        +2.5%
      </span>
    </div>
    <div>
      <p class="text-gray-400 text-sm font-medium mb-1">
        Banca Atual
      </p>
      <h3 class="text-2xl font-bold text-white">
        R$ 12.450,00
      </h3>
    </div>
  </div>
</template>
