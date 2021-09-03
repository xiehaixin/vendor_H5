<template>
  <transition name="slide">
    <div class="mineralElement">
      <ul class="mineralHear">
        <li v-for="(min,index) in mineral"
            :key="index"
            @click="mineralName=min.name;mineralContent=min.content">
          <p :class="{avtive:min.name==mineralName}">{{min.name}}</p>
        </li>
      </ul>
      <div>
        <ul class="mineralContent">
          <li v-for="(minCon,index) in mineralContent"
              :key="index">
            <p class="title"><span v-show="mineralContent.length>1">{{index+1}}.</span>{{minCon.title}}</p>
            <p class="content">{{minCon.content}}</p>
          </li>
        </ul>
      </div>
    </div>

  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      mineralName: '钾',
      mineralContent: [
        {
          title: '钾的好处',
          content: ' 可以调节细胞内适宜的渗透压和体液的酸碱平衡，参与细胞内糖和蛋白质的代谢。有助于维持神经健康、心跳规律正常，可以预防中风，并协助肌肉正常收缩。在摄入高钠而导致高血压时，钾具有降血压作用。'
        },
      ],
      mineral: [
        {
          name: '钾',
          content: [
            {
              title: '钾的好处',
              content: ' 可以调节细胞内适宜的渗透压和体液的酸碱平衡，参与细胞内糖和蛋白质的代谢。有助于维持神经健康、心跳规律正常，可以预防中风，并协助肌肉正常收缩。在摄入高钠而导致高血压时，钾具有降血压作用。'
            },
          ]
        },
        {
          name: '偏硅酸',
          content: [
            {
              title: '偏硅酸的好处',
              content: ' 偏硅酸对人体主动脉硬化具有软化作用,对心脏病、高血压、动脉硬化、神经功能紊乱、胃病及胃溃疡等均有一定保健作用,并具有抗癌抗衰老的功能。人体缺乏偏硅酸将导致心血管疾病的发生。 偏硅酸与钙、镁具有相似的生物学作用，可增加软骨、结缔组织的弹性和强度，能促进骨骼和牙齿生长发育，有利于骨骼钙化和防治骨质疏松。'
            },
            {
              title: '产地分布',
              content: ' 中国含偏硅酸的水分布广泛，在许多省、直辖市、自治区均有发现。'
            }
          ]
        },
        {
          name: '锶',
          content: [
            {
              title: '锶的好处',
              content: ' 锶是人体必需的微量元素,但含量很少。锶与心血管的功能及构造有关;锶在人体内有强壮骨骼、防治心血管疾病的功效;人体缺乏锶将会阻碍新陈代谢,产生牙齿和骨骼发育不正常等症状。'
            },
          ]
        },
        {
          name: '钙',
          content: [
            {
              title: '钙的好处',
              content: ' 钙是组成人体骨骼的必需元素,对青少年的生长发育起着主要控制作用。钙的含量影响水的硬度,硬度与心血管发病率有关,常饮含钙水可增强心肌活力。'
            },
          ]
        },
        {
          name: '钠',
          content: [
            {
              title: '钠的好处',
              content: ' 钠是人体不可缺少的部分,它对维持细胞系统和调节水盐平衡起重要作用。钠是调节心血管功能和改善消化系统功能不可缺少的元素。'
            },
          ]
        },
        {
          name: '硒',
          content: [
            {
              title: '硒的好处',
              content: ' 硒可刺激免疫球蛋白及抗体的产生,增强体液和细胞免疫力,具有抗癌作用。硒还有抗氧化作用,使体内氧化物脱氧,具有解毒作用,能抵抗和减低汞、镉、砷的毒性,提高视力。'
            },
          ]
        },
        {
          name: '铁',
          content: [
            {
              title: '铁的好处',
              content: ' 铁是人体血液中运输和交换氧所必需的成分。人体缺铁会发生小细胞性贫血,免疫功能下降和新陈代谢紊乱等。'
            },
          ]
        },
        {
          name: '锌',
          content: [
            {
              title: '锌的好处',
              content: '  锌能促进生长发育,对婴儿更重要;能增强肌体免疫力和性功能;能增强创伤组织再生能力,使受伤和手术部位愈合加快;能使皮肤更健美,使人变得更聪明;能改善味觉增强食欲。'
            },
          ]
        },
        {
          name: '碘',
          content: [
            {
              title: '碘的好处',
              content: ' 碘有促进蛋白合成,活化多种酶,调节能量转换,加速生长发育,促进伤口愈合,保持正常新陈代谢的重要生理作用。人体缺碘则导致甲状腺肿大、发育停滞、痴呆等症状。'
            },
          ]
        },
        {
          name: '氟',
          content: [
            {
              title: '氟的好处',
              content: ' 氟是形成坚硬的骨骼和牙齿必不可少的元素,以氟化钙的形式存在,对骨骼和牙齿的健康生长起重要作用。缺氟可造成蛀牙。'
            },
          ]
        },
        {
          name: '硼酸',
          content: [
            {
              title: '硼酸的好处',
              content: ' 1995年FAO/WHO把硼分类为人体可能必须微量元素。微量的硼对人体新陈代谢起到一定积极的作用，如防止骨质疏松，促进钙在人体内的代谢等。'
            },
          ]
        },
        {
          name: '硫酸根离子',
          content: [
            {
              title: '硫酸根离子的好处',
              content: ' 对维持人体内PH值平衡和渗透压有很大作用。'
            },
          ]
        },
        {
          name: '碳酸氢根离子',
          content: [
            {
              title: '碳酸氢根离子的好处',
              content: ' 是保持血液的PH值平衡，预防血液酸性化。'
            },
          ]
        },
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.mineralElement {
  position: fixed;
  top: 0;
  bottom:0;
  min-height: 100%;
  width: 100%;
  background: #f4f4f4;
  z-index:2;
  .mineralHear {
    padding: 12px 12px;
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    li {
      p {
        color: #979797;
        font-size: 28px;
        padding: 8px 30px;
        border: 2px #979797 solid;
        border-radius: 10px;
        margin: 12px;
      }
      .avtive {
        background: #1cb0ff;
        box-shadow: 0px 4px 8px 0px rgba(116, 190, 255, 0.26);
        color: #ffffff;
        border: 2px #1cb0ff solid;
      }
    }
  }
  .mineralContent {
    padding: 26px 22px;
    li {
      .title {
        border-left: 4px #1cb0ff solid;
        font-size: 26px;
        padding-left: 8px;
        font-weight: 500;
        margin-bottom: 12px;
        margin-top: 32px;
      }
      .content {
        font-size: 26px;
        text-indent: 40px;
        color: #666666;
        line-height: 40px;
      }
    }
  }
}
 
</style>
