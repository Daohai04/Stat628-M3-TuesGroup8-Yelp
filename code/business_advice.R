buss0 = fread("/Users/chenjiawen/Desktop/Stat628/bussiness.csv")
buss1 = fread("/Users/chenjiawen/Desktop/Stat628/bussiness_att.csv")
buss1 = cbind(buss1,buss0$V11)
colnames(buss1)[ncol(buss1)] = "name"


text = rep("",nrow(buss1))
for(i in 1:length(text)){
  text[i] = paste0(ifelse((!is.na(buss1$businessparking_street[i])) & buss1$businessparking_street[i]=="yes",
                       "It is nice to provide street parking. ",
                       "Providing street parking can help you raise about 0.4 stars. "),
                ifelse((!is.na(buss1$goodformeal_dinner[i])) &buss1$goodformeal_dinner[i]=="yes",
                       "Your bussiness does good in dinner meal. ",
                       "Improving dinner sevice can help you raise about 0.2 stars. "),
                ifelse((!is.na(buss1$outdoorseating[i])) &buss1$outdoorseating[i]=="yes",
                       "Your custormers love to have meal outside. ",
                       "Outdoor seating is another way to improve your stars for about 0.2 stars. "),
                ifelse((!is.na(buss1$bikeparking[i])) &buss1$bikeparking[i]=="yes",
                       "Bike parking is a nice service. ",
                       "Your customer need place to park their bikes. It can help improve about 0.2 stars. "),
                ifelse((!is.na(buss1$noiselevel[i])) &buss1$noiselevel[i]%in%c("loud","very_loud"),
                       "The noise level in your bussiness is too loud and it decrease your bussiness review about 0.2-0.6 stars. ",
                       "Your customers are satisfied with the noise level in your bussiness. "),
                ifelse((!is.na(buss1$wheelchairaccessible[i])) &buss1$wheelchairaccessible[i]=="yes",
                       "Providing wheel chair accessible is really helpful.",
                       "Providing wheel chair accessible is a good option to increase your star for about 0.2 stars. "),
                ifelse((!is.na(buss1$alcohol[i])) &buss1$alcohol[i]=="none",
                        "Your customer would like some alcohol in your bussiness.",
                        "It is nice to provide alcohol and it does make your customer satisfied. "),
                ifelse((!is.na(buss1$wifi[i])) &buss1$wifi[i]%in% c("paid","none"),
                        "Please provide free wifi in your bussiness.",
                          "")
                )
}
text
buss_adv = cbind(buss0$V11,text)
buss_adv = as.data.frame(buss_adv)
colnames(buss_adv) = c("Bussiness_name","advice")
ncol(buss_adv)
buss_adv = cbind(buss_adv[,c(1,2)],as.character(buss0$V5),
                 as.character(buss0$V12),as.character(buss0$V14))
colnames(buss_adv)[c(3,4,5)]=c("city","zipcode","stars")
fwrite(buss_adv,"/Users/chenjiawen/Desktop/Stat628/bussiness_advice.txt",quote=F,row.names = F,col.names = T,sep="\t")
