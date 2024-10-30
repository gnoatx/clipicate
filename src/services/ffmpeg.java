import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

public class FFMpegExample {
    public static void main(String[] args) {
        String caminhoEntrada = "input.mp4";
        String caminhoSaida = "output.gif";

        // Verifica se o arquivo de entrada existe
        File arquivoEntrada = new File(caminhoEntrada);
        if (!arquivoEntrada.exists()) {
            System.err.println("O arquivo de entrada não existe: " + caminhoEntrada);
            return;
        }

        try {
            String[] comando = {
                "ffmpeg", 
                "-i", caminhoEntrada, 
                caminhoSaida 
            };

            ProcessBuilder pb = new ProcessBuilder(comando);
            Process processo = pb.start();

            // Captura a saída padrão
            BufferedReader leitor = new BufferedReader(new InputStreamReader(processo.getInputStream()));
            StringBuilder saida = new StringBuilder();
            String linha;
            while ((linha = leitor.readLine()) != null) {
                saida.append(linha).append("\n");
            }

            // Captura a saída de erro
            BufferedReader leitorErro = new BufferedReader(new InputStreamReader(processo.getErrorStream()));
            StringBuilder erroSaida = new StringBuilder();
            while ((linha = leitorErro.readLine()) != null) {
                erroSaida.append(linha).append("\n");
            }

            int codigoSaida = processo.waitFor();
            System.out.println("Processo finalizado com código: " + codigoSaida);
            System.out.println("Saída:\n" + saida);
            if (erroSaida.length() > 0) {
                System.err.println("Saída de Erro:\n" + erroSaida);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}