/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  BookOpen, Award, CheckCircle, HelpCircle, Sparkles, 
  Thermometer, Wind, Activity, Layers, Target, Check, AlertCircle,
  Trophy, Gamepad2, XCircle, Send, Zap
} from 'lucide-react';

interface MathFormulaProps {
  tex: string;
  display?: boolean;
  className?: string;
}

function MathFormula({ tex, display = false, className = '' }: MathFormulaProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(tex, containerRef.current, {
        throwOnError: false,
        displayMode: display,
      });
    }
  }, [tex, display]);

  return <span ref={containerRef} className={className} />;
}

function RichText({ content, className = '' }: { content: string; className?: string }) {
  if (!content) return null;
  const parts = content.split('$');
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return <MathFormula key={index} tex={part} className="inline-block px-1 text-cyan-300 font-semibold" />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

// Slide data structure
interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: 'cover' | 'evaluation' | 'review-intro' | 'review' | 'intro' | 'theory-p1-a' | 'theory-p1-b' | 'theory-p2-a' | 'theory-p2-b' | 'theory-p3-a' | 'theory-p3-b' | 'game1-mcq' | 'game2-tf' | 'game3-short';
  reviewIndex?: number;
  gameIndex?: number;
  content?: any;
  notes: string;
}

interface EvaluationRow {
  stt: number;
  name: string;
  task: string;
  score: string;
  comment: string;
}

const evaluationRows: EvaluationRow[] = [
  { stt: 1, name: "Lý Cao Nguyên", task: "Làm bài thuyết trình", score: "10", comment: "Làm việc nhanh lẹ, đúng thời hạn" },
  { stt: 2, name: "Trần Thanh Hiền", task: "Soạn câu hỏi trắc nghiệm bài 8", score: "10", comment: "Soạn câu hỏi hay, đúng trọng tâm bài" },
  { stt: 3, name: "Phạm Quốc Thắng", task: "Soạn câu hỏi trắc nghiệm bài 9", score: "10", comment: "Soạn câu hỏi hay, làm việc nhanh lẹ" },
  { stt: 4, name: "Phan Ngọc Như Ý", task: "Soạn câu hỏi trắc nghiệm bài 10", score: "10", comment: "Soạn câu hỏi đúng trọng tâm" },
  { stt: 5, name: "Hà Phước Anh Kiệt", task: "Soạn câu hỏi trắc nghiệm bài 11", score: "10", comment: "Soạn câu hỏi đúng trọng tâm" },
  { stt: 6, name: "Nguyễn Minh Quân", task: "Soạn câu hỏi trắc nghiệm bài 12", score: "10", comment: "Soạn câu hỏi đúng trọng tâm" },
  { stt: 7, name: "Phan Kim Ngọc", task: "Soạn câu hỏi đúng sai bài 8 và 9", score: "10", comment: "Soạn câu hỏi hay, nhanh lẹ, bám sát bài học" },
  { stt: 8, name: "Lung Sơn Hoàng Phúc", task: "Soạn câu hỏi đúng sai bài 10, 11", score: "10", comment: "Soạn câu hỏi bám sát bài học" },
  { stt: 9, name: "Nguyễn Da Vĩnh", task: "Soạn câu hỏi trả lời ngắn", score: "10", comment: "Soạn câu hỏi đúng trọng tâm bài học" },
  { stt: 10, name: "Trương Nguyễn Thành Tài", task: "Soạn câu hỏi đúng sai bài 12", score: "10", comment: "Hoàn thành tốt nhiệm vụ" }
];

interface ReviewQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const reviewQuestions: ReviewQuestion[] = [
  {
    id: 1,
    question: "Câu 1. Phương trình trạng thái của khí lý tưởng liên hệ giữa",
    options: [
      { label: "A", text: "Áp suất, thể tích và nhiệt độ của khí." },
      { label: "B", text: "Khối lượng, thể tích và nhiệt độ của khí." },
      { label: "C", text: "Áp suất, nhiệt độ và số mol của khí." },
      { label: "D", text: "Khối lượng, áp suất và số mol của khí." }
    ],
    correctAnswer: "A",
    explanation: "Phương trình trạng thái của khí lí tưởng (phương trình Clapeyron) thiết lập mối liên hệ giữa ba thông số trạng thái của một lượng khí xác định là áp suất (p), thể tích (V) và nhiệt độ tuyệt đối (T): pV/T = hằng số."
  },
  {
    id: 2,
    question: "Câu 2. Hệ thức nào sau đây không đúng với phương trình trạng thái khí lí tưởng?",
    options: [
      { label: "A", text: "$\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}$" },
      { label: "B", text: "$p_1 V_1 T_2 = p_2 V_2 T_1$" },
      { label: "C", text: "$\\frac{p_1 T_1}{V_1} = \\frac{p_2 T_2}{V_2}$" },
      { label: "D", text: "$\\frac{pV}{T} = \\text{hằng số}$" }
    ],
    correctAnswer: "C",
    explanation: "Hệ thức $\\frac{p_1 T_1}{V_1} = \\frac{p_2 T_2}{V_2}$ không đúng. Các hệ thức đúng là $\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}$ (suy ra $p_1 V_1 T_2 = p_2 V_2 T_1$) và $\\frac{pV}{T} = \\text{hằng số}$."
  },
  {
    id: 3,
    question: "Câu 3. Phát biểu nào sau đây không đúng khi nói về phương trình trạng thái của một lượng khí xác định?",
    options: [
      { label: "A", text: "Quá trình chuyển trạng thái không phụ thuộc cách chuyển trạng thái mà chỉ phụ thuộc trạng thái đầu và trạng thái cuối." },
      { label: "B", text: "Độ lớn hằng số $\\frac{pV}{T}$ không phụ thuộc vào lượng khí ta xét." },
      { label: "C", text: "Phương trình $pV = nRT$ là phương trình trạng thái của một lượng $n$ mol khí lí tưởng." },
      { label: "D", text: "$R = 8{,}31\\ \\text{J/(mol}\\cdot\\text{K)}$ là hằng số khí lí tưởng." }
    ],
    correctAnswer: "B",
    explanation: "Độ lớn hằng số $\\frac{pV}{T}$ phụ thuộc vào lượng khí ta xét (số mol $n$ hoặc khối lượng $m$). Do đó phát biểu B là không đúng."
  },
  {
    id: 4,
    question: "Câu 4. Phương trình trạng thái của một khối lượng khí lí tưởng được xác định bởi công thức nào?",
    options: [
      { label: "A", text: "$\\frac{pV}{T} = \\text{hằng số}$" },
      { label: "B", text: "$\\frac{pT}{V} = \\text{hằng số}$" },
      { label: "C", text: "$\\frac{TV}{p} = \\text{hằng số}$" },
      { label: "D", text: "$\\frac{V}{T} = \\text{hằng số}$" }
    ],
    correctAnswer: "A",
    explanation: "Đối với một khối lượng khí lí tưởng xác định, tỉ số giữa tích áp suất và thể tích với nhiệt độ tuyệt đối luôn là một hằng số: $\\frac{pV}{T} = \\text{hằng số}$."
  },
  {
    id: 5,
    question: "Câu 5. Hằng số khí lí tưởng có giá trị là",
    options: [
      { label: "A", text: "$R = 8{,}13\\ \\text{J/(mol}\\cdot\\text{K)}$" },
      { label: "B", text: "$R = 8{,}31\\ \\text{J/(mol}\\cdot\\text{K)}$" },
      { label: "C", text: "$R = 3{,}81\\ \\text{J/(mol}\\cdot\\text{K)}$" },
      { label: "D", text: "$R = 3{,}18\\ \\text{J/(mol}\\cdot\\text{K)}$" }
    ],
    correctAnswer: "B",
    explanation: "Hằng số khí lí tưởng $R$ trong phương trình Clapeyron - Mendeleev ($pV = nRT$) có giá trị xấp xỉ $R = 8{,}31\\ \\text{J/(mol}\\cdot\\text{K)}$."
  },
  {
    id: 6,
    question: "Câu 6. Hãy phán đoán xem, trong thí nghiệm Brown, nếu ta tăng nhiệt độ của nước thì các hạt phấn hoa chuyển động như thế nào?",
    options: [
      { label: "A", text: "Ngừng chuyển động." },
      { label: "B", text: "Chuyển động chậm hơn." },
      { label: "C", text: "Chuyển động nhanh hơn." },
      { label: "D", text: "Chuyển động không đổi." }
    ],
    correctAnswer: "C",
    explanation: "Khi tăng nhiệt độ của nước, động năng chuyển động nhiệt của các phân tử nước tăng lên, dẫn đến các va chạm vào hạt phấn hoa mạnh hơn và thường xuyên hơn, làm cho hạt phấn hoa chuyển động nhanh hơn."
  },
  {
    id: 7,
    question: "Câu 7. Phát biểu nào sau đây phù hợp với thuyết động học của khí lý tưởng?",
    options: [
      { label: "A", text: "Các phân tử truyền năng lượng thông qua va chạm." },
      { label: "B", text: "Các phân tử luôn ở trạng thái tĩnh." },
      { label: "C", text: "Lực hút giữa các phân tử là hằng số." },
      { label: "D", text: "Kích thước của các phân tử lớn hơn nhiều so với khoảng cách giữa chúng." }
    ],
    correctAnswer: "A",
    explanation: "Theo thuyết động học phân tử chất khí, các phân tử khí chuyển động hỗn độn không ngừng và va chạm đàn hồi với nhau, qua đó truyền năng lượng thông qua va chạm."
  },
  {
    id: 8,
    question: "Câu 8. Khi thể tích của một khối lượng khí lý tưởng cố định tăng lên ở nhiệt độ không đổi, tích của áp suất và thể tích của khí sẽ",
    options: [
      { label: "A", text: "Giảm" },
      { label: "B", text: "Tăng lên" },
      { label: "C", text: "Vẫn không thay đổi" },
      { label: "D", text: "Không thể dự đoán được" }
    ],
    correctAnswer: "C",
    explanation: "Theo định luật Boyle đối với quá trình đẳng nhiệt của một lượng khí xác định, tích của áp suất và thể tích ($pV$) luôn không thay đổi (hằng số)."
  },
  {
    id: 9,
    question: "Câu 9. Thuộc tính nào quyết định hướng trao đổi năng lượng nội tại giữa hai vật thể?",
    options: [
      { label: "A", text: "Nhiệt độ" },
      { label: "B", text: "Nhiệt dung riêng" },
      { label: "C", text: "Khối lượng" },
      { label: "D", text: "Tỉ trọng" }
    ],
    correctAnswer: "A",
    explanation: "Nhiệt độ là đại lượng quyết định chiều truyền nhiệt: nhiệt lượng luôn tự phát truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn."
  },
  {
    id: 10,
    question: "Câu 10. Khí lí tưởng là chất khí",
    options: [
      { label: "A", text: "Có khối lượng riêng lớn." },
      { label: "B", text: "Dễ bị nén khi tăng áp suất." },
      { label: "C", text: "Trong đó các phân tử được coi là chất điểm và chỉ tương tác khi va chạm." },
      { label: "D", text: "Trong đó phân tử khí có kích thước bằng khoảng cách giữa chúng." }
    ],
    correctAnswer: "C",
    explanation: "Khí lí tưởng là mô hình chất khí trong đó các phân tử được coi là các chất điểm và bỏ qua lực tương tác giữa chúng khi không va chạm (chỉ tương tác khi va chạm)."
  }
];

interface GameMcqQuestion {
  id: number;
  isEnglish?: boolean;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const gameMcqQuestions: GameMcqQuestion[] = [
  {
    id: 1,
    question: "Câu 1. Bản chất vi mô của áp suất chất khí tác dụng lên thành bình là do",
    options: [
      { label: "A", text: "Khối lượng của các phân tử khí đè nặng lên thành bình." },
      { label: "B", text: "Vô số các phân tử khí va chạm liên tục và đàn hồi vào thành bình." },
      { label: "C", text: "Lực hút tĩnh điện giữa các phân tử khí và thành bình." },
      { label: "D", text: "Sự dãn nở nhiệt của vật liệu làm thành bình chứa." }
    ],
    correctAnswer: "B",
    explanation: "Áp suất chất khí tác dụng lên thành bình có nguồn gốc từ vô số phân tử khí chuyển động nhiệt hỗn loạn không ngừng và va chạm đàn hồi liên tục vào thành bình."
  },
  {
    id: 2,
    question: "Câu 2. Biểu thức nào sau đây xác định áp suất chất khí theo mô hình động học phân tử?",
    options: [
      { label: "A", text: "$p = \\frac{1}{3}\\mu m \\overline{v^2}$" },
      { label: "B", text: "$p = \\frac{1}{2}\\mu m \\overline{v^2}$" },
      { label: "C", text: "$p = \\mu m \\overline{v^2}$" },
      { label: "D", text: "$p = \\frac{2}{3}\\mu m \\overline{v^2}$" }
    ],
    correctAnswer: "A",
    explanation: "Phương trình cơ bản của thuyết động học phân tử chất khí: $p = \\frac{1}{3}\\mu m \\overline{v^2}$ hoặc theo động năng trung bình: $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}}$."
  },
  {
    id: 3,
    question: "Câu 3. Trong công thức $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}}$, đại lượng $\\mu$ biểu thị",
    options: [
      { label: "A", text: "Khối lượng riêng của chất khí." },
      { label: "B", text: "Số mol chất khí có trong bình." },
      { label: "C", text: "Mật độ phân tử khí (số phân tử trong $1\\ \\text{m}^3$)." },
      { label: "D", text: "Khối lượng của một phân tử khí." }
    ],
    correctAnswer: "C",
    explanation: "$\\mu = \\frac{N}{V}$ là mật độ phân tử khí, đơn vị là $\\text{phân tử/m}^3$ ($\\text{m}^{-3}$), biểu diễn số lượng phân tử có trong một đơn vị thể tích chất khí."
  },
  {
    id: 4,
    isEnglish: true,
    question: "Question 4 (English). The average translational kinetic energy of an ideal gas molecule is directly proportional to",
    options: [
      { label: "A", text: "The absolute temperature of the gas ($T$ in Kelvin)." },
      { label: "B", text: "The volume of the container ($V$)." },
      { label: "C", text: "The Celsius temperature ($t^\\circ\\text{C}$)." },
      { label: "D", text: "The pressure of the gas ($p$)." }
    ],
    correctAnswer: "A",
    explanation: "According to the kinetic molecular theory: $\\overline{E_{\\text{k}}} = \\frac{3}{2}kT$. The average translational kinetic energy is directly proportional to the absolute temperature $T$ (Kelvin), not the Celsius temperature."
  },
  {
    id: 5,
    isEnglish: true,
    question: "Question 5 (English). The Boltzmann constant $k$ has an approximate value and unit of",
    options: [
      { label: "A", text: "$R = 8{,}31\\ \\text{J/(mol}\\cdot\\text{K)}$" },
      { label: "B", text: "$k \\approx 1{,}38 \\times 10^{-23}\\ \\text{J/K}$" },
      { label: "C", text: "$N_A \\approx 6{,}02 \\times 10^{23}\\ \\text{mol}^{-1}$" },
      { label: "D", text: "$e \\approx 1{,}60 \\times 10^{-19}\\ \\text{C}$" }
    ],
    correctAnswer: "B",
    explanation: "The Boltzmann constant relates thermal energy to absolute temperature: $k = \\frac{R}{N_A} \\approx 1{,}38 \\times 10^{-23}\\ \\text{J/K}$."
  },
  {
    id: 6,
    question: "Câu 6. Khi nhiệt độ tuyệt đối của khối khí tăng lên $4$ lần thì tốc độ căn quân phương ($v_{\\text{rms}}$) của các phân tử sẽ",
    options: [
      { label: "A", text: "Tăng $4$ lần." },
      { label: "B", text: "Tăng $2$ lần." },
      { label: "C", text: "Không thay đổi." },
      { label: "D", text: "Giảm $2$ lần." }
    ],
    correctAnswer: "B",
    explanation: "Vì $v_{\\text{rms}} = \\sqrt{\\overline{v^2}} = \\sqrt{\\frac{3kT}{m}}$ tỉ lệ thuận với $\\sqrt{T}$, nên khi $T$ tăng $4$ lần thì $v_{\\text{rms}}$ tăng $\\sqrt{4} = 2$ lần."
  },
  {
    id: 7,
    question: "Câu 7. Nếu giữ nguyên nhiệt độ của khối khí và nén để thể tích giảm $2$ lần thì áp suất của khí sẽ",
    options: [
      { label: "A", text: "Tăng $2$ lần." },
      { label: "B", text: "Giảm $2$ lần." },
      { label: "C", text: "Tăng $4$ lần." },
      { label: "D", text: "Không đổi." }
    ],
    correctAnswer: "A",
    explanation: "Khi $T$ không đổi thì $\\overline{E_{\\text{đ}}}$ không đổi. Thể tích giảm $2$ lần làm mật độ $\\mu = \\frac{N}{V}$ tăng $2$ lần, do đó áp suất $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}}$ tăng $2$ lần (phù hợp định luật Boyle)."
  },
  {
    id: 8,
    isEnglish: true,
    question: "Question 8 (English). At absolute zero ($0\\ \\text{K}$ or $-273{,}15^\\circ\\text{C}$), which of the following statements is TRUE?",
    options: [
      { label: "A", text: "The average translational kinetic energy of molecules is zero ($\\overline{E_{\\text{k}}} = 0$)." },
      { label: "B", text: "The mass of each molecule becomes zero ($m = 0$)." },
      { label: "C", text: "The volume of the gas increases to infinity." },
      { label: "D", text: "The speed of gas molecules reaches the speed of light." }
    ],
    correctAnswer: "A",
    explanation: "At $T = 0\\ \\text{K}$, $\\overline{E_{\\text{k}}} = \\frac{3}{2}k(0) = 0$. All thermal motion of molecules completely stops at absolute zero."
  },
  {
    id: 9,
    question: "Câu 9. Hai bình kín chứa khí Heli và khí Oxy ở cùng nhiệt độ $300\\ \\text{K}$. Khẳng định nào sau đây là đúng?",
    options: [
      { label: "A", text: "Động năng tịnh tiến trung bình của phân tử hai khí bằng nhau." },
      { label: "B", text: "Tốc độ trung bình của các phân tử hai khí bằng nhau." },
      { label: "C", text: "Áp suất khí trong hai bình chắc chắn bằng nhau." },
      { label: "D", text: "Khối lượng phân tử hai khí bằng nhau." }
    ],
    correctAnswer: "A",
    explanation: "Động năng tịnh tiến trung bình $\\overline{E_{\\text{đ}}} = \\frac{3}{2}kT$ chỉ phụ thuộc vào nhiệt độ tuyệt đối $T$, không phụ thuộc vào loại khí, nên ở cùng $300\\ \\text{K}$ thì $\\overline{E_{\\text{đ}}}$ của phân tử hai khí là bằng nhau."
  },
  {
    id: 10,
    question: "Câu 10. Một khối khí có mật độ $\\mu = 3 \\times 10^{25}\\ \\text{m}^{-3}$ và động năng tịnh tiến trung bình $\\overline{E_{\\text{đ}}} = 5 \\times 10^{-21}\\ \\text{J}$. Áp suất của khối khí là",
    options: [
      { label: "A", text: "$100.000\\ \\text{Pa}\\ (10^5\\ \\text{Pa})$" },
      { label: "B", text: "$150.000\\ \\text{Pa}$" },
      { label: "C", text: "$300.000\\ \\text{Pa}$" },
      { label: "D", text: "$50.000\\ \\text{Pa}$" }
    ],
    correctAnswer: "A",
    explanation: "Áp dụng công thức $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}} = \\frac{2}{3} \\times (3 \\times 10^{25}) \\times (5 \\times 10^{-21}) = 10^5\\ \\text{Pa}$."
  }
];

interface GameTfQuestion {
  id: number;
  context: string;
  items: {
    key: 'a' | 'b' | 'c' | 'd';
    statement: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const gameTfQuestions: GameTfQuestion[] = [
  {
    id: 1,
    context: "Một bình kín dung tích $V = 10\\ \\text{lít}$ chứa khí heli ở nhiệt độ $27^\\circ\\text{C}$ và áp suất $p = 10^5\\ \\text{Pa}$. Cho hằng số Boltzmann $k = 1{,}38 \\times 10^{-23}\\ \\text{J/K}$ và $1\\ \\text{lít} = 10^{-3}\\ \\text{m}^3$.",
    items: [
      {
        key: 'a',
        statement: "Nhiệt độ tuyệt đối của khối khí trong bình là $T = 300\\ \\text{K}$.",
        isCorrect: true,
        explanation: "ĐÚNG: $T = 27 + 273 = 300\\ \\text{K}$."
      },
      {
        key: 'b',
        statement: "Động năng tịnh tiến trung bình của một nguyên tử heli bằng $6{,}21 \\times 10^{-21}\\ \\text{J}$.",
        isCorrect: true,
        explanation: "ĐÚNG: $\\overline{E_{\\text{đ}}} = \\frac{3}{2}kT = 1{,}5 \\times (1{,}38 \\times 10^{-23}) \\times 300 = 6{,}21 \\times 10^{-21}\\ \\text{J}$."
      },
      {
        key: 'c',
        statement: "Mật độ phân tử khí heli trong bình xấp xỉ bằng $2{,}42 \\times 10^{25}\\ \\text{m}^{-3}$.",
        isCorrect: true,
        explanation: "ĐÚNG: Từ $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}} \\implies \\mu = \\frac{3p}{2\\overline{E_{\\text{đ}}}} = \\frac{3 \\times 10^5}{2 \\times 6{,}21 \\times 10^{-21}} \\approx 2{,}42 \\times 10^{25}\\ \\text{m}^{-3}$."
      },
      {
        key: 'd',
        statement: "Nếu nung nóng bình để nhiệt độ tăng lên $54^\\circ\\text{C}$ thì động năng tịnh tiến trung bình tăng gấp đôi.",
        isCorrect: false,
        explanation: "SAI: Động năng trung bình tỉ lệ thuận với nhiệt độ tuyệt đối $T$ (Kelvin). Khi $t = 54^\\circ\\text{C}$ thì $T = 54 + 273 = 327\\ \\text{K}$, không phải gấp đôi $300\\ \\text{K}$ (gấp đôi phải là $600\\ \\text{K} = 327^\\circ\\text{C}$)."
      }
    ]
  },
  {
    id: 2,
    context: "Xét mô hình động học phân tử và mối liên hệ giữa động năng phân tử với nhiệt độ chất khí:",
    items: [
      {
        key: 'a',
        statement: "Các phân tử khí được coi là chất điểm và chỉ tương tác với nhau khi va chạm.",
        isCorrect: true,
        explanation: "ĐÚNG: Đây là giả thuyết cơ bản trong mô hình khí lí tưởng."
      },
      {
        key: 'b',
        statement: "Các va chạm giữa phân tử khí với thành bình là va chạm mềm làm mất mát cơ năng.",
        isCorrect: false,
        explanation: "SAI: Các va chạm của phân tử khí với nhau và với thành bình được coi là va chạm hoàn toàn đàn hồi."
      },
      {
        key: 'c',
        statement: "Áp suất chất khí tỉ lệ thuận với mật độ phân tử khí $\\mu$ và động năng tịnh tiến trung bình $\\overline{E_{\\text{đ}}}$.",
        isCorrect: true,
        explanation: "ĐÚNG: Công thức $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}}$ chứng minh áp suất tỉ lệ thuận với cả mật độ $\\mu$ và động năng trung bình $\\overline{E_{\\text{đ}}}$."
      },
      {
        key: 'd',
        statement: "Hai chất khí khác nhau ở cùng một nhiệt độ tuyệt đối thì tốc độ căn quân phương ($v_{\\text{rms}}$) chắc chắn bằng nhau.",
        isCorrect: false,
        explanation: "SAI: Vì $v_{\\text{rms}} = \\sqrt{\\frac{3kT}{m}}$, phụ thuộc vào khối lượng phân tử $m$. Các khí khác nhau có khối lượng $m$ khác nhau nên $v_{\\text{rms}}$ khác nhau, dù động năng trung bình bằng nhau."
      }
    ]
  }
];

interface GameShortQuestion {
  id: number;
  question: string;
  hint: string;
  validAnswers: string[];
  unit: string;
  explanation: string;
}

const gameShortQuestions: GameShortQuestion[] = [
  {
    id: 1,
    question: "Câu 1. Nhiệt độ phòng thí nghiệm đo được là $27^\\circ\\text{C}$. Hãy chuyển đổi giá trị nhiệt độ này sang thang nhiệt độ Kelvin ($K$).",
    hint: "Công thức chuyển đổi: $T\\ (\\text{K}) = t\\ (^\\circ\\text{C}) + 273$",
    validAnswers: ["300", "300k", "300 k", "300 kelvin"],
    unit: "K",
    explanation: "$T = 27 + 273 = 300\\ \\text{K}$. Đáp số: 300."
  },
  {
    id: 2,
    question: "Câu 2. Cho mật độ phân tử khí $\\mu = 3 \\times 10^{25}\\ \\text{m}^{-3}$ và động năng tịnh tiến trung bình $\\overline{E_{\\text{đ}}} = 2 \\times 10^{-21}\\ \\text{J}$. Tính áp suất của khối khí theo đơn vị kilôpascal ($kPa$).",
    hint: "Công thức: $p = \\frac{2}{3}\\mu \\overline{E_{\\text{đ}}}$, sau đó đổi $\\text{Pa}$ sang $\\text{kPa}$ ($1\\ \\text{kPa} = 1.000\\ \\text{Pa}$).",
    validAnswers: ["40", "40 kpa", "40kpa"],
    unit: "kPa",
    explanation: "$p = \\frac{2}{3} \\times (3 \\times 10^{25}) \\times (2 \\times 10^{-21}) = 40.000\\ \\text{Pa} = 40\\ \\text{kPa}$. Đáp số: 40."
  },
  {
    id: 3,
    question: "Câu 3. Khi nhiệt độ tuyệt đối của một lượng khí lí tưởng tăng từ $100\\ \\text{K}$ lên $400\\ \\text{K}$ thì động năng tịnh tiến trung bình của các phân tử khí tăng lên bao nhiêu lần?",
    hint: "Vì động năng tịnh tiến trung bình tỉ lệ thuận với nhiệt độ tuyệt đối: $\\overline{E_{\\text{đ}}} \\sim T$.",
    validAnswers: ["4", "4 lần", "4 lan"],
    unit: "lần",
    explanation: "Vì $\\overline{E_{\\text{đ}}} = \\frac{3}{2}kT \\sim T$, nhiệt độ $T$ tăng từ $100\\ \\text{K}$ lên $400\\ \\text{K}$ (gấp $4$ lần) nên động năng tịnh tiến trung bình cũng tăng $4$ lần. Đáp số: 4."
  }
];

const slides: Slide[] = [
  {
    id: 1,
    title: "SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH VĨNH LONG",
    subtitle: "TRƯỜNG THCS VÀ THPT TÂN QUỚI",
    type: 'cover',
    notes: "Kính chào quý thầy cô và các em học sinh. Hôm nay chúng ta cùng nghiên cứu Bài 12 trong chương trình Vật Lí 12."
  },
  {
    id: 2,
    title: "Bảng Đánh Giá Thành Viên Nhóm",
    subtitle: "PHÂN CÔNG NHIỆM VỤ VÀ NHẬN XÉT",
    type: 'evaluation',
    notes: "Bảng phân công công việc, điểm số và nhận xét đánh giá các thành viên trong nhóm."
  },
  {
    id: 3,
    title: "Nhắc Lại Bài Cũ",
    type: 'review-intro',
    notes: "Ôn tập kiến thức bài cũ trước khi vào bài mới."
  },
  {
    id: 4,
    title: "Câu 1: Phương trình trạng thái khí lý tưởng",
    type: 'review',
    reviewIndex: 0,
    notes: "Kiểm tra kiến thức về các thông số trạng thái khí lí tưởng."
  },
  {
    id: 5,
    title: "Câu 2: Hệ thức phương trình trạng thái",
    type: 'review',
    reviewIndex: 1,
    notes: "Kiểm tra hệ thức định luật khí lí tưởng."
  },
  {
    id: 6,
    title: "Câu 3: Phát biểu về phương trình trạng thái",
    type: 'review',
    reviewIndex: 2,
    notes: "Kiểm tra hiểu biết về hằng số pV/T."
  },
  {
    id: 7,
    title: "Câu 4: Công thức phương trình trạng thái",
    type: 'review',
    reviewIndex: 3,
    notes: "Kiểm tra phương trình Clapeyron."
  },
  {
    id: 8,
    title: "Câu 5: Hằng số khí lí tưởng R",
    type: 'review',
    reviewIndex: 4,
    notes: "Kiểm tra giá trị hằng số R."
  },
  {
    id: 9,
    title: "Câu 6: Thí nghiệm Brown & Nhiệt độ",
    type: 'review',
    reviewIndex: 5,
    notes: "Kiểm tra hiện tượng chuyển động nhiệt."
  },
  {
    id: 10,
    title: "Câu 7: Thuyết động học khí lý tưởng",
    type: 'review',
    reviewIndex: 6,
    notes: "Kiểm tra các phát biểu về thuyết động học."
  },
  {
    id: 11,
    title: "Câu 8: Định luật Boyle & Khí lý tưởng",
    type: 'review',
    reviewIndex: 7,
    notes: "Kiểm tra quá trình đẳng nhiệt."
  },
  {
    id: 12,
    title: "Câu 9: Trao đổi năng lượng nội tại",
    type: 'review',
    reviewIndex: 8,
    notes: "Kiểm tra vai trò của nhiệt độ."
  },
  {
    id: 13,
    title: "Câu 10: Khái niệm khí lí tưởng",
    type: 'review',
    reviewIndex: 9,
    notes: "Kiểm tra mô hình khí lí tưởng."
  },
  {
    id: 14,
    title: "Nội Dung Bài Học",
    subtitle: "BÀI 12. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ. QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ",
    type: 'intro',
    notes: "Các mục chính của Bài 12 theo Sách giáo khoa Vật Lí 12 (Kết nối tri thức với cuộc sống)."
  },
  {
    id: 15,
    title: "I.1. Sự Va Chạm Của Một Phân Tử Khí Lên Thành Bình",
    subtitle: "PHẦN 1: ĐỘ BIẾN THIÊN ĐỘNG LƯỢNG",
    type: 'theory-p1-a',
    notes: "Khảo sát quá trình va chạm đàn hồi của một phân tử khí lên thành bình và tính độ biến thiên động lượng."
  },
  {
    id: 16,
    title: "I.1. Sự Va Chạm Của Một Phân Tử Khí Lên Thành Bình",
    subtitle: "PHẦN 2: LỰC TÁC DỤNG LÊN THÀNH BÌNH",
    type: 'theory-p1-b',
    notes: "Tính khoảng thời gian giữa các va chạm và lực do một phân tử khí tác dụng lên thành bình."
  },
  {
    id: 17,
    title: "I.2. Tác Dụng Của N Phân Tử Khí Lên Thành Bình",
    subtitle: "PHẦN 1: CHUYỂN ĐỘNG ĐẲNG HƯỚNG & LỰC TỔNG CỘNG",
    type: 'theory-p2-a',
    notes: "Tính chất chuyển động hỗn loạn đẳng hướng và xác định lực tổng cộng do N phân tử khí tác dụng lên thành bình."
  },
  {
    id: 18,
    title: "I.2. Tác Dụng Của N Phân Tử Khí Lên Thành Bình",
    subtitle: "PHẦN 2: CÔNG THỨC ÁP SUẤT & Ý NGHĨA VẬT LÍ",
    type: 'theory-p2-b',
    notes: "Xây dựng công thức áp suất chất khí theo mô hình động học phân tử và phân tích ý nghĩa vật lí vi mô."
  },
  {
    id: 19,
    title: "II. Mối Quan Hệ Giữa Động Năng Phân Tử Và Nhiệt Độ",
    subtitle: "PHẦN 1: HỆ THỨC CƠ BẢN VỀ NHIỆT ĐỘ VÀ ĐỘNG NĂNG",
    type: 'theory-p3-a',
    notes: "Xây dựng công thức liên hệ giữa động năng tịnh tiến trung bình của phân tử và nhiệt độ tuyệt đối T."
  },
  {
    id: 20,
    title: "II. Mối Quan Hệ Giữa Động Năng Phân Tử Và Nhiệt Độ",
    subtitle: "PHẦN 2: BẢN CHẤT CỦA NHIỆT ĐỘ & ĐỘ KHÔNG TUYỆT ĐỐI",
    type: 'theory-p3-b',
    notes: "Ý nghĩa vật lí vi mô của nhiệt độ và ý nghĩa của độ không tuyệt đối 0 K."
  },
  // TRÒ CHƠI 1: 10 CÂU TRẮC NGHIỆM (MỖI CÂU LÀ 1 TRANG)
  {
    id: 21,
    title: "Trò Chơi 1 · Câu 1: Áp suất chất khí",
    subtitle: "TRẮC NGHIỆM CỦNG CỐ KIẾN THỨC BÀI 12",
    type: 'game1-mcq',
    gameIndex: 0,
    notes: "Câu 1: Bản chất vi mô của áp suất chất khí tác dụng lên thành bình."
  },
  {
    id: 22,
    title: "Trò Chơi 1 · Câu 2: Biểu thức áp suất chất khí",
    subtitle: "MÔ HÌNH ĐỘNG HỌC PHÂN TỬ",
    type: 'game1-mcq',
    gameIndex: 1,
    notes: "Câu 2: Công thức áp suất theo mô hình động học phân tử."
  },
  {
    id: 23,
    title: "Trò Chơi 1 · Câu 3: Mật độ phân tử khí",
    subtitle: "Ý NGHĨA CÁC ĐẠI LƯỢNG TRONG CÔNG THỨC",
    type: 'game1-mcq',
    gameIndex: 2,
    notes: "Câu 3: Khái niệm và đơn vị mật độ phân tử khí."
  },
  {
    id: 24,
    title: "Game 1 · Question 4: Kinetic Energy & Temperature",
    subtitle: "🇬🇧 ENGLISH CHALLENGE (BILINGUAL)",
    type: 'game1-mcq',
    gameIndex: 3,
    notes: "Question 4: Translational kinetic energy and absolute temperature."
  },
  {
    id: 25,
    title: "Game 1 · Question 5: Boltzmann Constant",
    subtitle: "🇬🇧 ENGLISH CHALLENGE (BILINGUAL)",
    type: 'game1-mcq',
    gameIndex: 4,
    notes: "Question 5: Value and unit of the Boltzmann constant k."
  },
  {
    id: 26,
    title: "Trò Chơi 1 · Câu 6: Tốc độ căn quân phương",
    subtitle: "SỰ PHỤ THUỘC VÀO NHIỆT ĐỘ TUYỆT ĐỐI",
    type: 'game1-mcq',
    gameIndex: 5,
    notes: "Câu 6: Mối liên hệ giữa tốc độ v_rms và nhiệt độ T."
  },
  {
    id: 27,
    title: "Trò Chơi 1 · Câu 7: Quá trình nén khí đẳng nhiệt",
    subtitle: "MÔ HÌNH ĐỘNG HỌC & ĐỊNH LUẬT BOYLE",
    type: 'game1-mcq',
    gameIndex: 6,
    notes: "Câu 7: Giải thích định luật Boyle qua mô hình vi mô."
  },
  {
    id: 28,
    title: "Game 1 · Question 8: Absolute Zero (0 K)",
    subtitle: "🇬🇧 ENGLISH CHALLENGE (BILINGUAL)",
    type: 'game1-mcq',
    gameIndex: 7,
    notes: "Question 8: Meaning of absolute zero temperature."
  },
  {
    id: 29,
    title: "Trò Chơi 1 · Câu 9: Hai khối khí ở cùng nhiệt độ",
    subtitle: "Ý NGHĨA ĐỘNG NĂNG TRUNG BÌNH",
    type: 'game1-mcq',
    gameIndex: 8,
    notes: "Câu 9: Động năng phân tử của hai chất khí khác nhau ở cùng nhiệt độ."
  },
  {
    id: 30,
    title: "Trò Chơi 1 · Câu 10: Tính áp suất chất khí",
    subtitle: "VẬN DỤNG CÔNG THỨC TÍNH TOÁN",
    type: 'game1-mcq',
    gameIndex: 9,
    notes: "Câu 10: Bài toán tính áp suất từ mật độ và động năng trung bình."
  },

  // TRÒ CHƠI 2: 2 CÂU ĐÚNG / SAI (MỖI CÂU LÀ 1 TRANG, 4 Ý a, b, c, d)
  {
    id: 31,
    title: "Trò Chơi 2 · Câu 1: Khảo sát bình khí Heli",
    subtitle: "TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d)",
    type: 'game2-tf',
    gameIndex: 0,
    notes: "Trắc nghiệm Đúng / Sai Câu 1: Khảo sát bình chứa khí Heli ở 27°C."
  },
  {
    id: 32,
    title: "Trò Chơi 2 · Câu 2: Mô hình động học & Nhiệt độ",
    subtitle: "TRẮC NGHIỆM ĐÚNG / SAI (4 Ý a, b, c, d)",
    type: 'game2-tf',
    gameIndex: 1,
    notes: "Trắc nghiệm Đúng / Sai Câu 2: Các nhận định về mô hình động học chất khí."
  },

  // TRÒ CHƠI 3: 3 CÂU TRẢ LỜI NGẮN (MỖI CÂU LÀ 1 TRANG, DẠNG DỄ)
  {
    id: 33,
    title: "Trò Chơi 3 · Câu 1: Đổi nhiệt độ sang thang Kelvin",
    subtitle: "CÂU HỎI TRẢ LỜI NGẮN (DẠNG DỄ)",
    type: 'game3-short',
    gameIndex: 0,
    notes: "Câu hỏi trả lời ngắn 1: Đổi 27°C sang thang nhiệt độ Kelvin."
  },
  {
    id: 34,
    title: "Trò Chơi 3 · Câu 2: Tính áp suất chất khí (kPa)",
    subtitle: "CÂU HỎI TRẢ LỜI NGẮN (DẠNG DỄ)",
    type: 'game3-short',
    gameIndex: 1,
    notes: "Câu hỏi trả lời ngắn 2: Tính áp suất từ mật độ và động năng ra đơn vị kPa."
  },
  {
    id: 35,
    title: "Trò Chơi 3 · Câu 3: Độ tăng động năng theo nhiệt độ",
    subtitle: "CÂU HỎI TRẢ LỜI NGẮN (DẠNG DỄ)",
    type: 'game3-short',
    gameIndex: 2,
    notes: "Câu hỏi trả lời ngắn 3: Xác định tỉ số tăng động năng khi T tăng từ 100K lên 400K."
  }
];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Review Quiz states
  const [selectedReviewAnswers, setSelectedReviewAnswers] = useState<{ [key: number]: string }>({});

  // Game 1 (10 MCQ) states
  const [game1Answers, setGame1Answers] = useState<{ [qIndex: number]: string }>({});

  // Game 2 (True/False 4 items) states
  const [game2Answers, setGame2Answers] = useState<{ [key: string]: boolean }>({});

  // Game 3 (Short Answers) states
  const [game3Inputs, setGame3Inputs] = useState<{ [qIndex: number]: string }>({});
  const [game3Submitted, setGame3Submitted] = useState<{ [qIndex: number]: boolean }>({});

  const playReviewSound = (isCorrect: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      if (isCorrect) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.setValueAtTime(160, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      }
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {}
  };

  const currentSlide = slides[currentSlideIndex];

  // Navigation handlers
  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Main Presentation Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 flex flex-col bg-slate-900 relative overflow-y-auto">
          <div className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center pb-24">
            
            {/* SLIDE 1: COVER 1 */}
            {currentSlide.type === 'cover' && currentSlideIndex === 0 && (
              <div className="text-center space-y-8 animate-fade-in my-auto py-12">
                <div className="inline-block px-4 py-1.5 bg-cyan-950/80 border border-cyan-800/60 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-2">
                  BÀI HỌC TƯƠNG TÁC · VẬT LÍ 12
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                  SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH VĨNH LONG<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    TRƯỜNG THCS VÀ THPT TÂN QUỚI
                  </span>
                </h2>
                <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full my-6"></div>
                <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-slate-800/50 border border-slate-700/65 shadow-xl backdrop-blur-sm">
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-3">CHƯƠNG II: CHẤT KHÍ</span>
                  <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    BÀI 12. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ
                  </h3>
                  <p className="text-lg md:text-xl font-semibold text-cyan-300 mt-4">
                    QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ
                  </p>
                </div>
                <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm text-slate-300">
                  <span>GV bộ môn: <strong className="text-cyan-400">Đoàn Thị Khoẻ</strong></span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span>Năm học: <strong className="text-white">2026 - 2027</strong></span>
                </div>
              </div>
            )}

            {/* SLIDE 2: EVALUATION TABLE */}
            {currentSlide.type === 'evaluation' && (
              <div className="space-y-6 my-auto py-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">PHÂN CÔNG & ĐÁNH GIÁ</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mt-1">Bảng Đánh Giá</h2>
                </div>

                <div className="rounded-2xl bg-slate-800/50 border border-slate-700/60 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/60 border-b border-slate-700/70 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                          <th className="py-3.5 px-4 text-center w-16">STT</th>
                          <th className="py-3.5 px-4 min-w-[180px]">Họ và tên học sinh</th>
                          <th className="py-3.5 px-4 min-w-[230px]">Nội dung công việc</th>
                          <th className="py-3.5 px-4 text-center w-24">Điểm</th>
                          <th className="py-3.5 px-4 min-w-[240px]">Đánh giá, nhận xét</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50 text-sm">
                        {evaluationRows.map((row) => (
                          <tr key={row.stt} className="hover:bg-slate-800/70 transition-colors">
                            <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-400 font-semibold">
                              {row.stt}
                            </td>
                            <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                              {row.name}
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {row.task}
                            </td>
                            <td className="py-3 px-4 text-center font-mono tabular-nums font-bold">
                              {row.score !== "—" ? (
                                <span className="text-cyan-400">{row.score}</span>
                              ) : (
                                <span className="text-slate-500">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {row.comment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE TYPE: REVIEW INTRO */}
            {currentSlide.type === 'review-intro' && (
              <div className="text-center space-y-6 my-auto py-12">
                <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full"></div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                  Nhắc Lại Bài Cũ
                </h2>
                <p className="text-xl text-cyan-300 font-medium">Kiểm tra kiến thức về phương trình trạng thái khí lí tưởng</p>
                <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full"></div>
              </div>
            )}

            {/* SLIDE TYPE: REVIEW (MỖI CÂU HỎI LÀ 1 TRANG) */}
            {currentSlide.type === 'review' && currentSlide.reviewIndex !== undefined && (() => {
              const qIndex = currentSlide.reviewIndex;
              const q = reviewQuestions[qIndex];
              const isSelected = selectedReviewAnswers[qIndex] !== undefined;
              const chosenOpt = selectedReviewAnswers[qIndex];

              return (
                <div className="space-y-6 my-auto py-4 max-w-4xl mx-auto w-full animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                        KIỂM TRA BÀI CŨ · CÂU HỎI {qIndex + 1} / {reviewQuestions.length}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                        Phương Trình Trạng Thái Khí Lí Tưởng
                      </h2>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="p-6 md:p-10 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl space-y-8">
                    <div className="text-lg md:text-2xl font-bold text-white leading-relaxed">
                      <RichText content={q.question} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt) => {
                        const isThisSelected = chosenOpt === opt.label;
                        const isThisCorrect = q.correctAnswer === opt.label;
                        const answered = isSelected;

                        let btnStyle = "bg-slate-900/90 border-slate-700 text-slate-100 hover:border-cyan-500 hover:bg-slate-900";
                        if (answered) {
                          if (isThisCorrect) {
                            btnStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 font-bold shadow-lg shadow-emerald-950/50";
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = "bg-rose-950/90 border-rose-500 text-rose-100 font-bold";
                          } else {
                            btnStyle = "bg-slate-900/40 border-slate-800 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt.label}
                            disabled={answered}
                            onClick={() => {
                              setSelectedReviewAnswers({ ...selectedReviewAnswers, [qIndex]: opt.label });
                              playReviewSound(isThisCorrect);
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${btnStyle}`}
                          >
                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
                              answered && isThisCorrect ? 'bg-emerald-500 text-white shadow-md' :
                              answered && isThisSelected && !isThisCorrect ? 'bg-rose-500 text-white shadow-md' :
                              'bg-slate-800 text-cyan-300 border border-slate-700'
                            }`}>
                              {opt.label}
                            </span>
                            <span className="flex-1 text-base md:text-lg pt-1.5 font-sans font-normal not-italic leading-relaxed text-slate-100 break-words whitespace-normal">
                              <RichText content={opt.text} />
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation box */}
                    {isSelected && (
                      <div className="p-6 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm uppercase tracking-wider">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          Lời giải chi tiết:
                        </div>
                        <p className="text-base font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          <RichText content={q.explanation} />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* SLIDE 4: NỘI DUNG BÀI HỌC (CHỈ HIỆN TỰA ĐỀ) */}
            {currentSlide.type === 'intro' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    SGK VẬT LÍ 12
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    Nội Dung Bài Học
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                    <button
                      type="button"
                      onClick={() => setCurrentSlideIndex(14)}
                      className="w-full text-left flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-base shrink-0">
                        I
                      </span>
                      <span className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Áp suất khí theo mô hình động học phân tử
                      </span>
                    </button>

                    <div className="pl-14 space-y-2.5 border-t border-slate-700/50 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(14)}
                        className="block w-full text-left text-base font-semibold text-cyan-300 hover:text-cyan-200 transition-colors py-1"
                      >
                        1. Tác dụng của một phân tử khí lên thành bình (Xem chi tiết)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(16)}
                        className="block w-full text-left text-base font-semibold text-cyan-300 hover:text-cyan-200 transition-colors py-1"
                      >
                        2. Tác dụng của N phân tử khí lên thành bình (Xem chi tiết)
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                    <button
                      type="button"
                      onClick={() => setCurrentSlideIndex(18)}
                      className="w-full text-left flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-base shrink-0">
                        II
                      </span>
                      <span className="text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        Mối quan hệ giữa động năng phân tử và nhiệt độ
                      </span>
                    </button>

                    <div className="pl-14 space-y-2.5 border-t border-slate-700/50 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(18)}
                        className="block w-full text-left text-base font-semibold text-blue-300 hover:text-blue-200 transition-colors py-1"
                      >
                        1. Hệ thức giữa động năng phân tử và nhiệt độ (Xem chi tiết)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(19)}
                        className="block w-full text-left text-base font-semibold text-blue-300 hover:text-blue-200 transition-colors py-1"
                      >
                        2. Bản chất vi mô của nhiệt độ & Độ không tuyệt đối (Xem chi tiết)
                      </button>
                    </div>
                  </div>

                  {/* Section III: Games */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 to-emerald-950/40 border border-amber-700/50 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-base shrink-0">
                        <Gamepad2 className="w-5 h-5" />
                      </span>
                      <span className="text-lg md:text-xl font-bold text-white">
                        Trò Chơi Củng Cố Bài Học
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(20)}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-left transition-all group"
                      >
                        <span className="text-xs text-amber-400 font-bold uppercase block mb-1">TRÒ CHƠI 1</span>
                        <span className="text-sm font-semibold text-white group-hover:text-amber-300 block">10 Câu Trắc Nghiệm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(30)}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-emerald-400 text-left transition-all group"
                      >
                        <span className="text-xs text-emerald-400 font-bold uppercase block mb-1">TRÒ CHƠI 2</span>
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-300 block">Trắc Nghiệm Đúng / Sai</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(32)}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-left transition-all group"
                      >
                        <span className="text-xs text-cyan-400 font-bold uppercase block mb-1">TRÒ CHƠI 3</span>
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 block">3 Câu Trả Lời Ngắn</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART I.1 - PAGE 1 */}
            {currentSlide.type === 'theory-p1-a' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    I. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ · PHẦN 1
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    1. Tác Dụng Của Một Phân Tử Khí (Độ Biến Thiên Động Lượng)
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed pt-1">
                        Xét một phân tử khí có khối lượng <MathFormula tex="m" className="text-cyan-300 font-bold" />, chuyển động nhiệt với vận tốc <MathFormula tex="v" className="text-cyan-300 font-bold" /> trong một bình lập phương cạnh <MathFormula tex="L" className="text-cyan-300 font-bold" />.
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-3 pt-1">
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Khi phân tử va chạm hoàn toàn đàn hồi với thành bình vuông góc với phương chuyển động:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                            <span className="text-xs text-slate-400 block mb-1">Vận tốc trước va chạm</span>
                            <MathFormula tex="v_{\text{trước}} = +v" display={true} className="text-emerald-400 text-lg" />
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                            <span className="text-xs text-slate-400 block mb-1">Vận tốc sau va chạm</span>
                            <MathFormula tex="v_{\text{sau}} = -v" display={true} className="text-rose-400 text-lg" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        3
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Độ biến thiên động lượng của phân tử trong một lần va chạm với thành bình:
                        </p>
                        <div className="p-5 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center">
                          <MathFormula tex="\Delta p = m(-v) - m(v) = -2mv" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                        <p className="text-base text-slate-300 italic text-center">
                          (Độ lớn độ biến thiên động lượng: <MathFormula tex="\Delta p = 2mv" className="text-white" />)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART I.1 - PAGE 2 */}
            {currentSlide.type === 'theory-p1-b' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    I. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ · PHẦN 2
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    1. Tác Dụng Của Một Phân Tử Khí (Lực Tác Dụng Lên Thành Bình)
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Khoảng thời gian giữa hai lần va chạm liên tiếp của phân tử đó vào cùng một thành bình:
                        </p>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                          <MathFormula tex="\Delta t = \frac{2L}{v}" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Theo định luật II Newton, lực do một phân tử tác dụng lên thành bình trong mỗi lần va chạm:
                        </p>
                        <div className="p-6 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center">
                          <MathFormula tex="F_1 = \frac{|\Delta p|}{\Delta t} = \frac{2mv}{\frac{2L}{v}} = \frac{mv^2}{L}" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-lg">
                        3
                      </span>
                      <div className="space-y-2 pt-1">
                        <h3 className="text-lg font-bold text-emerald-400">Kết luận quan trọng</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Lực do một phân tử khí tác dụng lên thành bình tỉ lệ thuận với khối lượng <MathFormula tex="m" className="text-white" /> và bình phương tốc độ <MathFormula tex="v^2" className="text-white" /> của phân tử, đồng thời tỉ lệ nghịch với kích thước bình <MathFormula tex="L" className="text-white" />.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART I.2 - PAGE 1 */}
            {currentSlide.type === 'theory-p2-a' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    I. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ · PHẦN 1
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    2. Tác Dụng Của N Phân Tử Khí (Chuyển Động Đẳng Hướng & Lực Tổng Cộng)
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Tính chất chuyển động hỗn loạn đẳng hướng</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Trong bình có chứa <MathFormula tex="N" className="text-white font-bold" /> phân tử khí chuyển động nhiệt hỗn loạn không ngừng theo mọi hướng. Do tính đẳng hướng, số phân tử chuyển động theo ba trục toạ độ <MathFormula tex="Ox, Oy, Oz" className="text-cyan-300" /> là như nhau:
                        </p>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                          <MathFormula tex="\overline{v_x^2} = \overline{v_y^2} = \overline{v_z^2} = \frac{1}{3}\overline{v^2}" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Lực tổng cộng do N phân tử tác dụng lên thành bình</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Lực do một phân tử tác dụng theo phương vuông góc với thành bình là <MathFormula tex="F_1 = \frac{m\overline{v_x^2}}{L}" className="text-cyan-300" />. Với <MathFormula tex="N" className="text-white font-bold" /> phân tử khí, tổng lực tác dụng lên thành bình diện tích <MathFormula tex="S = L^2" className="text-white" /> là:
                        </p>
                        <div className="p-5 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center">
                          <MathFormula tex="F = N \cdot \frac{m\overline{v_x^2}}{L} = \frac{1}{3}\frac{N \cdot m \cdot \overline{v^2}}{L}" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART I.2 - PAGE 2 */}
            {currentSlide.type === 'theory-p2-b' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    I. ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ · PHẦN 2
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    2. Tác Dụng Của N Phân Tử Khí (Công Thức Áp Suất & Ý Nghĩa)
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Công thức cơ bản của thuyết động học phân tử chất khí</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Áp suất khí là lực tác dụng lên một đơn vị diện tích thành bình (<MathFormula tex="S = L^2" className="text-white" />, thể tích <MathFormula tex="V = L \cdot S = L^3" className="text-white" />):
                        </p>
                        <div className="p-5 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-center">
                          <MathFormula tex="p = \frac{F}{S} = \frac{1}{3}\frac{N}{V}m\overline{v^2} = \frac{1}{3}\mu m\overline{v^2}" display={true} className="text-cyan-300 text-2xl md:text-3xl" />
                        </div>
                        <p className="text-base font-sans font-normal not-italic text-slate-300 leading-relaxed">
                          Trong đó: <MathFormula tex="\mu = \frac{N}{V}" className="text-cyan-300 font-bold" /> là mật độ phân tử khí (<MathFormula tex="\text{phân tử/m}^3" />), <MathFormula tex="m" className="text-cyan-300 font-bold" /> là khối lượng của một phân tử (<MathFormula tex="\text{kg}" />), <MathFormula tex="\overline{v^2}" className="text-cyan-300 font-bold" /> là giá trị trung bình của bình phương tốc độ phân tử.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Biểu diễn qua động năng tịnh tiến trung bình</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Vì động năng tịnh tiến trung bình của phân tử là <MathFormula tex="\overline{E_{\text{đ}}} = \frac{1}{2}m\overline{v^2}" className="text-cyan-300" /> suy ra <MathFormula tex="m\overline{v^2} = 2\overline{E_{\text{đ}}}" className="text-cyan-300" />:
                        </p>
                        <div className="p-5 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-center">
                          <MathFormula tex="p = \frac{2}{3}\mu \overline{E_{\text{đ}}}" display={true} className="text-cyan-300 text-2xl md:text-3xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-lg">
                        3
                      </span>
                      <div className="space-y-2 pt-1">
                        <h3 className="text-lg font-bold text-emerald-400">Ý nghĩa vật lí quan trọng</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Áp suất của chất khí tác dụng lên thành bình tỉ lệ thuận với <strong>mật độ phân tử</strong> (<MathFormula tex="\mu" className="text-white" />) và <strong>động năng tịnh tiến trung bình</strong> (<MathFormula tex="\overline{E_{\text{đ}}}" className="text-white" />) của các phân tử khí.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART II - PAGE 1 */}
            {currentSlide.type === 'theory-p3-a' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    II. MỐI QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ · PHẦN 1
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    1. Động Năng Tịnh Tiến Trung Bình Của Phân Tử
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <div className="space-y-3 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Xuất phát từ công thức áp suất và phương trình Clapeyron</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Từ công thức áp suất khí <MathFormula tex="p = \frac{2}{3}\mu \overline{E_{\text{đ}}}" className="text-white" /> và phương trình trạng thái khí lí tưởng <MathFormula tex="p = \mu k T" className="text-white" />:
                        </p>
                        <div className="p-5 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-center">
                          <MathFormula tex="\overline{E_{\text{đ}}} = \frac{1}{2}m\overline{v^2} = \frac{3}{2}kT" display={true} className="text-cyan-300 text-2xl md:text-3xl" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-2 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Ý nghĩa các đại lượng trong công thức</h3>
                        <ul className="space-y-2.5 text-base md:text-lg text-slate-200">
                          <li>• <MathFormula tex="\overline{E_{\text{đ}}}" className="text-cyan-300 font-bold" />: Động năng tịnh tiến trung bình của một phân tử khí (Joule - <MathFormula tex="\text{J}" />).</li>
                          <li>• <MathFormula tex="k = \frac{R}{N_A} \approx 1{,}38 \times 10^{-23}\ \text{J/K}" className="text-amber-400 font-bold" />: Hằng số Boltzmann.</li>
                          <li>• <MathFormula tex="T" className="text-cyan-300 font-bold" />: Nhiệt độ tuyệt đối của khối khí (Kelvin - <MathFormula tex="\text{K}" />), với <MathFormula tex="T = t^\circ\text{C} + 273" />.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        3
                      </span>
                      <div className="space-y-2 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Tốc độ căn quân phương (Root-Mean-Square Speed)</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Căn bậc hai của bình phương tốc độ trung bình của các phân tử khí:
                        </p>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                          <MathFormula tex="v_{\text{rms}} = \sqrt{\overline{v^2}} = \sqrt{\frac{3kT}{m}} = \sqrt{\frac{3RT}{M}}" display={true} className="text-cyan-300 text-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: THEORY PART II - PAGE 2 */}
            {currentSlide.type === 'theory-p3-b' && (
              <div className="space-y-8 my-auto py-8 max-w-4xl mx-auto w-full">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    II. MỐI QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ · PHẦN 2
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mt-1">
                    2. Bản Chất Vi Mô Của Nhiệt Độ &amp; Độ Không Tuyệt Đối
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-lg">
                        1
                      </span>
                      <div className="space-y-2 pt-1 w-full">
                        <h3 className="text-lg font-bold text-cyan-300">Bản chất vi mô của nhiệt độ</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Nhiệt độ tuyệt đối <MathFormula tex="T" className="text-cyan-300 font-bold" /> là số đo động năng tịnh tiến trung bình của các phân tử khí.
                        </p>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-base md:text-lg text-slate-200 space-y-2">
                          <p>• Nhiệt độ càng cao <MathFormula tex="\implies" /> các phân tử chuyển động nhiệt càng hỗn loạn và nhanh hơn.</p>
                          <p>• Các chất khí khác nhau ở <strong>cùng nhiệt độ</strong> thì các phân tử có <strong>cùng động năng tịnh tiến trung bình</strong>.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-lg">
                        2
                      </span>
                      <div className="space-y-2 pt-1 w-full">
                        <h3 className="text-lg font-bold text-emerald-400">Độ không tuyệt đối (0 K hay -273,15°C)</h3>
                        <p className="text-lg md:text-xl font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          Khi <MathFormula tex="T = 0\ \text{K}" className="text-emerald-300 font-bold" />: Động năng tịnh tiến trung bình của phân tử <MathFormula tex="\overline{E_{\text{đ}}} = 0" className="text-emerald-300 font-bold" />.
                        </p>
                        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                          Ở độ không tuyệt đối, mọi chuyển động nhiệt của phân tử đều dừng lại. Đây là mốc nhiệt độ thấp nhất lý thuyết trong tự nhiên (thực tế không thể làm lạnh một vật tới đúng 0 K).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE: GAME 1 - 10 MCQ (MỖI CÂU LÀ 1 TRANG) */}
            {currentSlide.type === 'game1-mcq' && currentSlide.gameIndex !== undefined && (() => {
              const qIndex = currentSlide.gameIndex;
              const q = gameMcqQuestions[qIndex];
              const isSelected = game1Answers[qIndex] !== undefined;
              const chosenOpt = game1Answers[qIndex];
              const correctCount = Object.keys(game1Answers).filter(k => game1Answers[Number(k)] === gameMcqQuestions[Number(k)].correctAnswer).length;

              return (
                <div className="space-y-6 my-auto py-4 max-w-4xl mx-auto w-full animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          TRÒ CHƠI 1: CỦNG CỐ TRẮC NGHIỆM BÀI 12
                        </span>
                        {q.isEnglish && (
                          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                            🇬🇧 English Challenge
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">
                        {q.isEnglish ? `Question ${qIndex + 1} / 10` : `Câu ${qIndex + 1} / 10`}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-600/60 text-amber-300 font-bold text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Đúng: {correctCount} / {gameMcqQuestions.length}
                      </div>
                      <button
                        onClick={() => {
                          const updated = { ...game1Answers };
                          delete updated[qIndex];
                          setGame1Answers(updated);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                        title="Làm lại câu này"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Làm lại
                      </button>
                    </div>
                  </div>

                  {/* Question selector bar (1-10) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {gameMcqQuestions.map((item, idx) => {
                      const ans = game1Answers[idx];
                      const isDone = ans !== undefined;
                      const isRight = isDone && ans === item.correctAnswer;
                      const isCurrent = idx === qIndex;

                      let pillStyle = "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500";
                      if (isDone) {
                        pillStyle = isRight 
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300 font-bold" 
                          : "bg-rose-950 border-rose-500 text-rose-300 font-bold";
                      }
                      if (isCurrent) {
                        pillStyle += " ring-2 ring-amber-400 shadow-lg scale-105";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(20 + idx)}
                          className={`w-9 h-9 rounded-xl border text-xs font-bold shrink-0 transition-all flex items-center justify-center ${pillStyle}`}
                          title={`Câu ${idx + 1}${item.isEnglish ? ' (English)' : ''}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Card */}
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl space-y-6">
                    <div className="text-lg md:text-xl font-bold text-white leading-relaxed">
                      <RichText content={q.question} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt) => {
                        const isThisSelected = chosenOpt === opt.label;
                        const isThisCorrect = q.correctAnswer === opt.label;
                        const answered = isSelected;

                        let btnStyle = "bg-slate-900/90 border-slate-700 text-slate-100 hover:border-amber-400 hover:bg-slate-900";
                        if (answered) {
                          if (isThisCorrect) {
                            btnStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 font-bold shadow-lg shadow-emerald-950/50";
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = "bg-rose-950/90 border-rose-500 text-rose-100 font-bold";
                          } else {
                            btnStyle = "bg-slate-900/40 border-slate-800 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt.label}
                            disabled={answered}
                            onClick={() => {
                              setGame1Answers({ ...game1Answers, [qIndex]: opt.label });
                              playReviewSound(isThisCorrect);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${btnStyle}`}
                          >
                            <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                              answered && isThisCorrect ? 'bg-emerald-500 text-white shadow-md' :
                              answered && isThisSelected && !isThisCorrect ? 'bg-rose-500 text-white shadow-md' :
                              'bg-slate-800 text-amber-300 border border-slate-700'
                            }`}>
                              {opt.label}
                            </span>
                            <span className="flex-1 text-base font-sans font-normal not-italic pt-1 leading-relaxed text-slate-100 break-words whitespace-normal">
                              <RichText content={opt.text} />
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation box */}
                    {isSelected && (
                      <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-2 animate-fade-in">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          {q.isEnglish ? 'Detailed Explanation:' : 'Lời giải chi tiết:'}
                        </div>
                        <p className="text-base font-sans font-normal not-italic text-slate-100 leading-relaxed">
                          <RichText content={q.explanation} />
                        </p>
                      </div>
                    )}

                    {/* Next / Prev question buttons */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-700/60">
                      <button
                        onClick={() => {
                          if (qIndex > 0) {
                            setCurrentSlideIndex(20 + qIndex - 1);
                          } else {
                            setCurrentSlideIndex(19);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {qIndex > 0 ? `Câu ${qIndex}` : 'Về Lý Thuyết II.2'}
                      </button>

                      <button
                        onClick={() => {
                          if (qIndex < 9) {
                            setCurrentSlideIndex(20 + qIndex + 1);
                          } else {
                            setCurrentSlideIndex(30);
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-amber-600 hover:bg-amber-500 text-white shadow-md flex items-center gap-1.5"
                      >
                        {qIndex < 9 ? `Câu ${qIndex + 2} tiếp theo` : 'Sang Trò Chơi 2 (Đúng / Sai)'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SLIDE: GAME 2 - TRUE/FALSE (MỖI CÂU LÀ 1 TRANG, 4 Ý a, b, c, d) */}
            {currentSlide.type === 'game2-tf' && currentSlide.gameIndex !== undefined && (() => {
              const qIndex = currentSlide.gameIndex;
              const currentTfQ = gameTfQuestions[qIndex];

              return (
                <div className="space-y-6 my-auto py-4 max-w-4xl mx-auto w-full animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        TRÒ CHƠI 2: TRẮC NGHIỆM ĐÚNG / SAI BÀI 12
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                        Câu {qIndex + 1} / 2 (4 Lệnh Hỏi a, b, c, d)
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentSlideIndex(30)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          qIndex === 0 ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Câu 1
                      </button>
                      <button
                        onClick={() => setCurrentSlideIndex(31)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          qIndex === 1 ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Câu 2
                      </button>
                    </div>
                  </div>

                  {/* Question context card */}
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-base md:text-lg font-medium text-slate-100 leading-relaxed">
                      <RichText content={currentTfQ.context} />
                    </div>

                    <div className="space-y-4">
                      {currentTfQ.items.map((item) => {
                        const answerKey = `${qIndex}_${item.key}`;
                        const chosenVal = game2Answers[answerKey];
                        const isAnswered = chosenVal !== undefined;
                        const isCorrect = isAnswered && chosenVal === item.isCorrect;

                        return (
                          <div 
                            key={item.key} 
                            className={`p-4 md:p-5 rounded-2xl border transition-all space-y-3 ${
                              !isAnswered ? 'bg-slate-900/60 border-slate-700' :
                              isCorrect ? 'bg-emerald-950/40 border-emerald-500/70' :
                              'bg-rose-950/40 border-rose-500/70'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-sm">
                                  {item.key})
                                </span>
                                <span className="text-base font-sans font-normal not-italic text-slate-100 leading-relaxed pt-0.5">
                                  <RichText content={item.statement} />
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <button
                                  onClick={() => {
                                    setGame2Answers({ ...game2Answers, [answerKey]: true });
                                    playReviewSound(item.isCorrect === true);
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    chosenVal === true
                                      ? (item.isCorrect ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' : 'bg-rose-600 border-rose-400 text-white shadow-md')
                                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                                  }`}
                                >
                                  Đúng
                                </button>
                                <button
                                  onClick={() => {
                                    setGame2Answers({ ...game2Answers, [answerKey]: false });
                                    playReviewSound(item.isCorrect === false);
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                    chosenVal === false
                                      ? (!item.isCorrect ? 'bg-emerald-600 border-emerald-400 text-white shadow-md' : 'bg-rose-600 border-rose-400 text-white shadow-md')
                                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                                  }`}
                                >
                                  Sai
                                </button>
                              </div>
                            </div>

                            {/* Explanation when answered */}
                            {isAnswered && (
                              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-200 animate-fade-in">
                                <span className="font-bold text-emerald-400">Giải thích: </span>
                                <RichText content={item.explanation} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Question navigation footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-700/60">
                      <button
                        onClick={() => {
                          if (qIndex === 0) {
                            setCurrentSlideIndex(29);
                          } else {
                            setCurrentSlideIndex(30);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {qIndex === 0 ? 'Về Trò Chơi 1 (Câu 10)' : 'Câu 1'}
                      </button>

                      <button
                        onClick={() => {
                          if (qIndex === 0) {
                            setCurrentSlideIndex(31);
                          } else {
                            setCurrentSlideIndex(32);
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5"
                      >
                        {qIndex === 0 ? 'Câu 2 tiếp theo' : 'Sang Trò Chơi 3 (Trả Lời Ngắn)'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SLIDE: GAME 3 - SHORT ANSWER (MỖI CÂU LÀ 1 TRANG, DẠNG DỄ) */}
            {currentSlide.type === 'game3-short' && currentSlide.gameIndex !== undefined && (() => {
              const qIndex = currentSlide.gameIndex;
              const q = gameShortQuestions[qIndex];
              const currentInput = game3Inputs[qIndex] || '';
              const isSubmitted = game3Submitted[qIndex];
              const cleanInput = currentInput.trim().toLowerCase();
              const isCorrect = q.validAnswers.some(ans => cleanInput === ans.toLowerCase());

              return (
                <div className="space-y-6 my-auto py-4 max-w-4xl mx-auto w-full animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        TRÒ CHƠI 3: THỬ THÁCH TRẢ LỜI NGẮN BÀI 12
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                        Câu {qIndex + 1} / 3 (Dạng Dễ)
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {[0, 1, 2].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(32 + idx)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            qIndex === idx ? 'bg-cyan-600 border-cyan-400 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          Câu {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className={`p-6 md:p-8 rounded-3xl border shadow-xl space-y-6 transition-all ${
                    !isSubmitted ? 'bg-slate-800/90 border-slate-700' :
                    isCorrect ? 'bg-emerald-950/30 border-emerald-500/70 shadow-emerald-950/40' :
                    'bg-rose-950/30 border-rose-500/70 shadow-rose-950/40'
                  }`}>
                    <div className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 text-base">
                        {qIndex + 1}
                      </span>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                          <RichText content={q.question} />
                        </h3>
                        <p className="text-sm text-amber-300/90 italic">
                          💡 <RichText content={q.hint} />
                        </p>
                      </div>
                    </div>

                    {/* Input row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={currentInput}
                          onChange={(e) => setGame3Inputs({ ...game3Inputs, [qIndex]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentInput.trim()) {
                              setGame3Submitted({ ...game3Submitted, [qIndex]: true });
                              const clean = currentInput.trim().toLowerCase();
                              const right = q.validAnswers.some(ans => clean === ans.toLowerCase());
                              playReviewSound(right);
                            }
                          }}
                          placeholder={`Nhập đáp số (đơn vị: ${q.unit})...`}
                          className="w-full px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium text-base"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          {q.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (!currentInput.trim()) return;
                          setGame3Submitted({ ...game3Submitted, [qIndex]: true });
                          const clean = currentInput.trim().toLowerCase();
                          const right = q.validAnswers.some(ans => clean === ans.toLowerCase());
                          playReviewSound(right);
                        }}
                        className="px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
                      >
                        <Send className="w-4 h-4" />
                        Kiểm tra
                      </button>
                    </div>

                    {/* Feedback & Detailed Explanation */}
                    {isSubmitted && (
                      <div className={`p-5 rounded-2xl border space-y-2 animate-fade-in ${
                        isCorrect ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200' : 'bg-rose-950/60 border-rose-500/80 text-rose-200'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {isCorrect ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                              <span>CHÍNH XÁC! 🎉</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-rose-400" />
                              <span>CHƯA CHÍNH XÁC. Hãy xem lời giải chi tiết bên dưới:</span>
                            </>
                          )}
                        </div>
                        <p className="text-base text-slate-100 font-sans font-normal not-italic leading-relaxed pt-1">
                          <RichText content={q.explanation} />
                        </p>
                      </div>
                    )}

                    {/* Question navigation footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-700/60">
                      <button
                        onClick={() => {
                          if (qIndex === 0) {
                            setCurrentSlideIndex(31);
                          } else {
                            setCurrentSlideIndex(32 + qIndex - 1);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {qIndex === 0 ? 'Về Trò Chơi 2 (Câu 2)' : `Câu ${qIndex}`}
                      </button>

                      <button
                        onClick={() => {
                          if (qIndex < 2) {
                            setCurrentSlideIndex(32 + qIndex + 1);
                          } else {
                            setCurrentSlideIndex(13);
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-1.5"
                      >
                        {qIndex < 2 ? `Câu ${qIndex + 2} tiếp theo` : 'Về Mục Lục Bài Học 🎉'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Minimalist Floating Presentation Navigation Pill */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-950/90 border border-slate-800/80 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-6 shadow-2xl">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center transition-colors ${currentSlideIndex === 0 ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
              title="Slide trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-cyan-400 px-3 tracking-wider">
              Slide {currentSlideIndex + 1} / {slides.length}
            </span>

            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center transition-colors ${currentSlideIndex === slides.length - 1 ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
              title="Slide sau"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
