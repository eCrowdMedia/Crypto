var NodeRSA = require('node-rsa');
var kpu_pem =	"-----BEGIN PUBLIC KEY-----\n" +
				"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAujKMioTib4wJfe/24sZb\n" +
				"araEYHMk/p//UohrfHKpO/dBQ39FtMUb8IEZZZ5prLn0GwRNCf/XHfKa7CBCersG\n" +
				"/vQ4zFc9kIL9GEX/7ez1qFsJxgg5vhjOsdAf5xnnRovuRnZKrw0ihpPsPJiOtCD/\n" +
				"4ITyGNkdS9URaljwRt4gcd9wKEi9JnSBr2+JKkZT45GsyhOjroayjp8kL4KSzaTK\n" +
				"7NfHcNa37TP9i6k5PJrwaQ5CqE72pc8Vf3qval8XjablvLQmKd35mpY4sX9fswrd\n" +
				"IDARNE84DlGzuJcMVSh34d9ivgWSrunZelyebZ/ZyMH4NkzbqvkSHyvmBj4uMDaf\n" +
				"nQIDAQAB\n" +
				"-----END PUBLIC KEY-----";
var kpr_pem =	"-----BEGIN RSA PRIVATE KEY-----\n" +
				"MIIEowIBAAKCAQEAujKMioTib4wJfe/24sZbaraEYHMk/p//UohrfHKpO/dBQ39F\n" +
				"tMUb8IEZZZ5prLn0GwRNCf/XHfKa7CBCersG/vQ4zFc9kIL9GEX/7ez1qFsJxgg5\n" +
				"vhjOsdAf5xnnRovuRnZKrw0ihpPsPJiOtCD/4ITyGNkdS9URaljwRt4gcd9wKEi9\n" +
				"JnSBr2+JKkZT45GsyhOjroayjp8kL4KSzaTK7NfHcNa37TP9i6k5PJrwaQ5CqE72\n" +
				"pc8Vf3qval8XjablvLQmKd35mpY4sX9fswrdIDARNE84DlGzuJcMVSh34d9ivgWS\n" +
				"runZelyebZ/ZyMH4NkzbqvkSHyvmBj4uMDafnQIDAQABAoIBAAYI1V036U7MLxKR\n" +
				"0GKRIy1WNPwbPzuxW8kE+tbRsIJtBQR2/39YVAt7Y6NTewFKFYs6nHSSghpKXpMA\n" +
				"iKcJoLRqndyhhzFDzYgX3K+NWnjWWn68jYKHs0s3/5Cx2jkDF/nYo5sAxfmumZ1t\n" +
				"JFLaLvDL3jzH7JcklKfpsf/Z+xs1oFWFnBNLadTukd7hBTxP37X09DTl/2zzUbi/\n" +
				"mWHR3yElGn9eq3vTECXlF7uO0TLLdlLunbjrIG15/91F8vq7yJMY9U9YjwtOQNLP\n" +
				"zqu2LWq0LgLKFNiVUVIWz9G9Lk6ur5JRxh6VEdXtVQOpRR3rgytqeF7WWSSlItmn\n" +
				"q8fWXYECgYEA+56ZOGwTz3I+sKlHrEItmtbxhWwYVRYDipZ6V1kDm6pYvCgQYS1F\n" +
				"Q++KBoXlzCX5X5wA02DyaOqvZWDYJdveTFlOPH8ph6nJVqRcM0WYuDQ/3cOIFMl6\n" +
				"imR4dHoS8fGMQ0JcrObIJ1Tr4kgVAvIyYE0KMyvbtGY6amWuXSGbD6kCgYEAvXBh\n" +
				"tNR5JedTs7BgBu1uMRDxpYJJNCLxk1J8Ke26nzpFt1cY6vBRj40G5X9wl0q3OQ6a\n" +
				"O244mEKLAc75LG30jfPYmwvdnk+elb/shDq44NaIdhiKb5plJ3i+bGZLCB/vDgGG\n" +
				"IgCi2czVJCmbIxvopvxY3GggvkP/hmEaAkqc2NUCgYA87zCN4GZ/w1v5LlWEGtau\n" +
				"e8UrmXzfBiC/bCeehZkBFqS8lDs7PVpb1GOppr16zetxQvdUOVMbI1Jsi6JssK1J\n" +
				"8gqnTehByVVP3SfS5tTQLx8UVmjbF9vMLf6ZvoJeAzADjcuht5XbKI6jUu97simO\n" +
				"9rk0oTdonaUh5RPvy9agWQKBgDNooQtKscnIeh2EWrrmigXEvF8W+Tit1vMM6mcS\n" +
				"fZeiX7L+buOq7edP9TQonmxgOVLBlLdWFQO04zZNba9R85DmQLzqvmys3LN0zwGf\n" +
				"UfaqIYQy6raYpqTMjpiqNehxihU58qWdmJQUky7qH5CqjTtrtc2ycFhR6bEU/tLq\n" +
				"XqA1AoGBAKNjEJNuQkxnE8QYDvOwKjai4Qj5UWTzoJu+cPv/skD3JI1DevZL1b3A\n" +
				"qrK9HssLQFlHQtzf8MkpMCsKmiub3Ta8jejAeSxcoySii0BmRvbbZfrkWvVR4Cew\n" +
				"XXihXyeFz/rMZ/vMJgcvGOOfjlwFjRSePzU4rnEF3iH9kmSbo/Lp\n" +
				"-----END RSA PRIVATE KEY-----";
// var kpu = new NodeRSA();
// kpu.loadFromPEM(kpu_pem);
var kpr = new NodeRSA();
kpr.loadFromPEM(kpr_pem);

var plaintext, ciphertext;
// plaintext = '1234567890123456';
// ciphertext = kpu.encrypt(plaintext, 'base64');
ciphertext = 'OpONzhXf62PGmd5GR0f20h5Y48kkQyaGLl9r0J7gMlBWMXUwSFOxlAd5F49BqNymaiizxjK7skrZKiN7wWN2rkR4YyaZcWF3TvGr9YiZkR0Zp7jE2/yZ331Q99S8m2SVkDSOdcQnuZc2AgEcdTsH48LRoymq4kFj7xv4YXw4uRg8RD0N+9/o5hoOM1p73rX94G9F1n7bz7smCPv/9dYzeboD1PjddhXhJvyfRg8iJVyDc5mP9vFh1SN0kco0SDJmo40aXCeg/lkv682FapWdsYfFcqsQGb5LVB0qcwPC8uqhkIqtBlEI1vto9mfmPT01A91+YL8n/AT7AmNI1IOdsA==';
console.log('ciphertext: ', ciphertext);
plaintext = kpr.decrypt(ciphertext, 'utf8');
console.log('plaintext: ', plaintext);