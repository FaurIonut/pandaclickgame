<template>
    <nav>
        <div class="navig" rel="stylesheet" href="*">
            <img src="/public/vite.svg" alt="card">
            <p>Ежедневная награда</p>
        </div>
        <div class="navig" rel="stylesheet" href="*">
            <img src="/public/vite.svg" alt="card">
            <p>Ежедневный шифр</p>
        </div>
        <div class="navig" rel="stylesheet" href="*">
            <img src="/public/vite.svg" alt="card">
            <p>Комбо</p>
        </div>
        <div class="navig" rel="stylesheet" href="*">
            <img src="/public/vite.svg" alt="card">
            <p>Мини Игра</p>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Prizes'
}
</script>
<style lang="scss">
nav{
    display: flex;
    justify-content: space-between;
    padding: 30px;

    .navig{
        border-radius: 13px;
        background-color: rgba(26, 117, 117, 0.239);
        backdrop-filter: blur(20px);
        margin-right: 9px;
        padding: 3px;
        height: 90px;
        width: 70px;
        font-size: 11px;
        
        img{
            width: 30px;
            height: auto;
            margin-top: 4px;
        }
    }
}


</style>